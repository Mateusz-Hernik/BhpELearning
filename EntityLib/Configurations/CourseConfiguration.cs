using EntityLib.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EntityLib.Configurations
{
    public class CourseConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.Property(c => c.Edition)
                .IsRequired();

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(c => c.ShortName)
                .HasMaxLength(30);

            builder.Property(c => c.StartDate)
                .IsRequired();

            builder.Property(c => c.EndDate)
                .IsRequired();

            builder.Property(c => c.IsVisible)
                 .HasDefaultValue(false);

            builder.Property(c => c.Description)
                .HasMaxLength(500);

            builder.Property(c => c.Photo)
                .HasMaxLength(70);

            builder.Property(c => c.Price)
                .IsRequired();
        }
    }
}
