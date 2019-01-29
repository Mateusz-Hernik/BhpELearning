using System.Collections.Generic;

namespace DTO.Responses
{
    public class UserCoursesDto
    {
        public IEnumerable<CourseDto> IncomingCourses { get; set; }
        public IEnumerable<CourseDto> ActiveCourses { get; set; }
        public IEnumerable<CourseDto> ExpiredCourses { get; set; }
    }
}
