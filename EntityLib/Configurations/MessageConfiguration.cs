using EntityLib.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EntityLib.Configurations
{
    public class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.Property(c => c.Text)
                .IsRequired();

            builder.Property(c => c.SendDate)
                .IsRequired();

            builder.Property(c => c.Sender)
                .IsRequired();

            builder.Property(c => c.IsRead)
                .IsRequired()
                .HasDefaultValue(false);
        }
    }
}
