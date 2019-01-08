using EntityLib.Shared;
using System;
using System.Collections.Generic;

namespace EntityLib.Entities
{
    public class Course : BaseEntity<int>
    {
        public int Edition { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsVisible { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
        public decimal Price { get; set; }
        public ICollection<UserCourse> UserCourses { get; set; }
    }
}
