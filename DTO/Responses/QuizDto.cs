using System.Collections.Generic;

namespace DTO.Responses
{
    public class QuizDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int QuestionAmount { get; set; }
        public int PassCondition { get; set; }
        public IEnumerable<QuestionDto> Questions { get; set; }
    }
}
