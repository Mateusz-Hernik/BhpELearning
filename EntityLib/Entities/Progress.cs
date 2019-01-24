using EntityLib.Shared;

namespace EntityLib.Entities
{
    public class Progress : BaseEntity<int>
    {
        public string UserId { get; set; }
        public int CourseId { get; set; }
        public int ActivityId { get; set; }
        public bool IsCompleted { get; set; }
        public int? Result { get; set; }
    }
}
