using System;

namespace DTO
{
    public class CourseInfoDTO
    {
        public int Id { get; set; }
        public int Edition { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string DescriptionWhen { get; set; }
        public string DescriptionCert { get; set; }
        public string Photo { get; set; }        
    }
}
