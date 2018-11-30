using EntityLib.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EntityLib.Configurations
{
    public class UserCourseConfiguration : IEntityTypeConfiguration<UserCourse>
    {
        public void Configure(EntityTypeBuilder<UserCourse> builder)
        {
            builder.Property(ue => ue.IsActive)
                .HasDefaultValue(false);

            builder.Property(ue => ue.IsPaid)
                .HasDefaultValue(false);
        }
    }
}
