﻿namespace EntityLib.Entities
{
    public class UserCourse
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public bool IsActive { get; set; }
        public bool IsPaid { get; set; }
    }
}
