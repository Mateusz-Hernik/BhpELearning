﻿using System;

namespace DTO
{
    public class ActivityDescriptionDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public int ActivityType { get; set; }
        public DateTime StartDate { get; set; }
    }
}
