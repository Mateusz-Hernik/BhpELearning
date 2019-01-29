using AutoMapper;
using BhpApp.Controllers.Base;
using DAL.Abstract;
using DTO.Responses;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BhpApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CoursesController : BaseController
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IUserRepository _userRepository;

        public CoursesController(
            ICourseRepository courseRepository,
            IUserRepository userRepository,
            IMapper mapper) : base(mapper)
        {
            _courseRepository = courseRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var courses = await _courseRepository.GetAllAsync();

            var coursesDto = _mapper.Map<IEnumerable<CourseDto>>(courses);

            return Ok(coursesDto);
        }

        [HttpGet("navcourses")]
        public async Task<IActionResult> GetAllForNav()
        {
            var courses = await _courseRepository.GetAllAsync();

            var coursesNavDto = _mapper.Map<IEnumerable<CourseNavDto>>(courses);

            return Ok(coursesNavDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var course = await _courseRepository.FindByIdAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            var courseInfoDto = _mapper.Map<CourseInfoDto>(course);

            return Ok(courseInfoDto);           
        }

        [HttpGet("usercourses/{email}")]
        public async Task<IActionResult> GetUserCourses(string email)
        {
            var user = await _userRepository.GetUserAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            var userCoursesDto = new UserCoursesDto()
            {
                IncomingCourses = _mapper.Map<IEnumerable<CourseDto>>(await _courseRepository.GetIncomingCourses(user.Id)),
                ActiveCourses = _mapper.Map<IEnumerable<CourseDto>>(await _courseRepository.GetActiveCourses(user.Id)),
                ExpiredCourses = _mapper.Map<IEnumerable<CourseDto>>(await _courseRepository.GetExpiredCourses(user.Id))
            };
                
            return Ok(userCoursesDto);
        }
    }
}
