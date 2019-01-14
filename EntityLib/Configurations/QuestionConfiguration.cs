using EntityLib.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EntityLib.Configurations
{
    public class QuestionConfiguration : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.Property(c => c.Number)
                .IsRequired();

            builder.Property(c => c.QuestionText)
                .HasMaxLength(500)
                .IsRequired();

            builder.Property(c => c.CorrectAnswer)
                .IsRequired();

            builder.Property(c => c.FirstAnswer)
                .HasMaxLength(300)
                .IsRequired();

            builder.Property(c => c.SecondAnswer)
                .HasMaxLength(300)
                .IsRequired();

            builder.Property(c => c.ThirdAnswer)
                .HasMaxLength(300)
                .IsRequired();

            builder.Property(c => c.FourthAnswer)
                .HasMaxLength(300)
                .IsRequired();
        }
    }
}
