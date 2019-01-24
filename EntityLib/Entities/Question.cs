using EntityLib.Shared;

namespace EntityLib.Entities
{
    public class Question : BaseEntity<int>
    {
        public int Number { get; set; }
        public string QuestionText { get; set; }
        public string CorrectAnswer { get; set; }
        public string FirstAnswer { get; set; }
        public string SecondAnswer { get; set; }
        public string ThirdAnswer { get; set; }
        public string FourthAnswer { get; set; }
        public Quiz Quiz { get; set; }
    }
}
