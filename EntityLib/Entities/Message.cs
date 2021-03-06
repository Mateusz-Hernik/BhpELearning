﻿using EntityLib.Shared;
using System;

namespace EntityLib.Entities
{
    public class Message : BaseEntity<int>
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public string Sender { get; set; }
        public DateTime SendDate { get; set; }
        public bool IsRead { get; set; }
        public User User { get; set; }
    }
}
