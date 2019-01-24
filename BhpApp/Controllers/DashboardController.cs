using AutoMapper;
using BhpApp.Controllers.Base;
using DAL.Abstract;
using DTO;
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
        private readonly IUserRepository _userRepository;

        public DashboardController(
            IActivityRepository activityRepository,
            ICourseRepository courseRepository,
            IMessageRepository messageRepository,
            IUserRepository userRepository,
            IMapper mapper) : base(mapper)
        {
            _activityRepository = activityRepository;
            _courseRepository = courseRepository;
            _messageRepository = messageRepository;
            _userRepository = userRepository;
        }

        [HttpGet("userinfo/{email}")]
        public async Task<IActionResult> GetUserInfo(string email)
        {
            var user = await _userRepository.GetUserAsync(email);

            if(user == null)
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

            if(user == null)
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

            foreach(var activity in userCourseDto.Activities)
            {
                var progress = await _activityRepository.GetActivityProgressAsync(user.Id, id, activity.Id);

                if(progress != null)
                {
                    activity.IsCompleted = progress.IsCompleted;

                    if(prevProgress != null)
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
    }
}
