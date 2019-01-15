using EntityLib.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace EntityLib.Entities
{
    public class Message : BaseEntity<int>
    {
        public string Text { get; set; }
        public string Sender { get; set; }
        public DateTime SendDate { get; set; }
        public bool IsRead { get; set; }
        public User User { get; set; }
    }
}
