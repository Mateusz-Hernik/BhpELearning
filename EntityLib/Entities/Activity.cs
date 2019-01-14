using EntityLib.Shared;
using System;

namespace EntityLib.Entities
{
    public abstract class Activity : BaseEntity<int>
    {
        public string Name { get; set; }
        public ActivityType ActivityType { get; set; }
        public int Order { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Course Course { get; set; }
    }

    public enum ActivityType
    {
        Quiz, Presentation, FileStore
    }
}
