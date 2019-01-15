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

        [HttpGet("info/{email}")]
        public async Task<IActionResult> GetDashboardInfo(string email)
        {
            var user = _userRepository.GetUserAsync(email);

            if(user.Result == null)
            {
                return NotFound();
            }

            var dashboardInfo = new DashboardInfoDto()
            {
                ActiveCoursesAmount = await _courseRepository.GetActiveCourseAmountAsync(user.Result.Id),
                UnreadMessagesAmount = await _messageRepository.GetUnreadAmountAsync(user.Result.Id),
                UserInfo = _mapper.Map<UserDto>(user.Result)
            };

            return Ok(dashboardInfo);
        }
    }
}
