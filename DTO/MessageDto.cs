using System;

namespace DTO
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string Sender { get; set; }
        public DateTime SendDate { get; set; }
        public bool IsRead { get; set; }
        public string UserId { get; set; }
    }
}
