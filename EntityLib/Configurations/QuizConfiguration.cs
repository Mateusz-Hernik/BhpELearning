using EntityLib.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EntityLib.Configurations
{
    public class QuizConfiguration : IEntityTypeConfiguration<Quiz>
    {
        public void Configure(EntityTypeBuilder<Quiz> builder)
        {
            builder.Property(c => c.QuestionAmount)
                .IsRequired();

            builder.Property(c => c.PassCondition)
                .IsRequired();
        }
    }
}
