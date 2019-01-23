using System;
using System.Collections.Generic;

namespace DTO
{
    public class UserCourseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Edition { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Photo { get; set; }
        public IEnumerable<ActivityDescriptionDto> Activities { get; set; }
    }
}
