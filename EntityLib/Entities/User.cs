using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace EntityLib.Entities
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public ICollection<Message> Messages { get; set; }
        public ICollection<UserCourse> UserCourses { get; set; }
    }
}
