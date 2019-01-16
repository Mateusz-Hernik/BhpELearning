using AutoMapper;
using BhpApp.Controllers.Base;
using DAL.Abstract;
using DTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BhpApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DashboardController : BaseController
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;

        public DashboardController(
            ICourseRepository courseRepository,
            IMessageRepository messageRepository,
            IUserRepository userRepository,
            IMapper mapper) : base(mapper)
        {
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
    }
}
