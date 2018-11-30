using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace EntityLib.Entities
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public ICollection<UserCourse> UserCourses { get; set; }
    }
}
