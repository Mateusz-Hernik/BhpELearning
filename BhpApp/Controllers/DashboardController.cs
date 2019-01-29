using AutoMapper;
using BhpApp.Controllers.Base;
using DAL.Abstract;
using DTO.Requests;
using DTO.Responses;
using EntityLib.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace BhpApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DashboardController : BaseController
    {
        private readonly IActivityRepository _activityRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IQuestionRepository _questionRepository;
        private readonly IUserRepository _userRepository;

        public DashboardController(
            IActivityRepository activityRepository,
            ICourseRepository courseRepository,
            IMessageRepository messageRepository,
            IQuestionRepository questionRepository,
            IUserRepository userRepository,
            IMapper mapper) : base(mapper)
        {
            _activityRepository = activityRepository;
            _courseRepository = courseRepository;
            _messageRepository = messageRepository;
            _questionRepository = questionRepository;
            _userRepository = userRepository;
        }

        [HttpGet("userinfo/{email}")]
        public async Task<IActionResult> GetUserInfo(string email)
        {
            var user = await _userRepository.GetUserAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            var userInfo = _mapper.Map<UserDto>(user);

            return Ok(userInfo);
        }

        [HttpGet("activityinfo/{email}")]
        public async Task<IActionResult> GetActivityInfo(string email)
        {
            var user = await _userRepository.GetUserAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            var activityInfo = new ActivityInfoDto()
            {
                ActiveCoursesAmount = await _courseRepository.GetActiveCourseAmountAsync(user.Id),
                UnreadMessagesAmount = await _messageRepository.GetUnreadAmountAsync(user.Id)
            };

            return Ok(activityInfo);
        }

        [HttpGet("usercourse/{email}/{id}")]
        public async Task<IActionResult> GetActivityInfo(string email, int id)
        {
            var user = await _userRepository.GetUserAsync(email);
            Progress prevProgress = null;

            if (user == null)
            {
                return NotFound();
            }

            var userCourseDto = _mapper.Map<UserCourseDto>(await _courseRepository.GetUserCourseAsync(user.Id, id));

            foreach (var activity in userCourseDto.Activities)
            {
                var progress = await _activityRepository.GetActivityProgressAsync(user.Id, id, activity.Id);

                if (progress != null)
                {
                    activity.IsCompleted = progress.IsCompleted;

                    if (prevProgress != null)
                    {
                        activity.IsAvaiable = prevProgress.IsCompleted && activity.StartDate <= DateTime.Now;
                    }
                    else
                    {
                        activity.IsAvaiable = activity.StartDate <= DateTime.Now;
                    }
                }

                prevProgress = progress;
            }

            return Ok(userCourseDto);
        }

        [HttpGet("quiz/{id}")]
        public async Task<IActionResult> GetQuiz(int id)
        {
            var userCourseDto = _mapper.Map<QuizDto>(await _activityRepository.GetQuizAsync(id));

            return Ok(userCourseDto);
        }

        [HttpPost("checkquiz")]
        public async Task<IActionResult> CheckQuizAnswers([FromBody]QuizAnswersDto quizAnswers)
        {
            try
            {
                var correctAnswers = 0;

                for (int i = 0; i < quizAnswers.QuestionIds.Length; ++i)
                {
                    var question = await _questionRepository.GetQuestionAsync(quizAnswers.QuestionIds[i]);

                    if (question != null)
                    {
                        if (quizAnswers.Answers[i].Equals(question.CorrectAnswer))
                        {
                            ++correctAnswers;
                        }
                    }
                }

                return Ok(correctAnswers);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpPost("completequiz")]
        public async Task<IActionResult> CompleteQuiz([FromBody]CompletedQuizInfoDto quizCompleted)
        {
            try
            {
                var user = await _userRepository.GetUserAsync(quizCompleted.UserName);

                if(user != null)
                {
                    await _activityRepository.CompleteActivityAsync(user.Id, quizCompleted.CourseId, quizCompleted.ActivityId);

                    return Ok();
                }

                return BadRequest();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
