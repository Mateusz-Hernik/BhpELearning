using System.Collections.Generic;

namespace EntityLib.Entities
{
    public class Quiz : Activity
    {
        public int QuestionAmount { get; set; }
        public int PassCondition { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}
