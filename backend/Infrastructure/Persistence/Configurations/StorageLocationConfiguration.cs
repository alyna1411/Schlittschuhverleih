using backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Infrastructure.Persistence.Configurations;

public class StorageLocationConfiguration
    : IEntityTypeConfiguration<StorageLocation>
{
    public void Configure(EntityTypeBuilder<StorageLocation> builder)
    {
        // Primärschlüssel
        builder.HasKey(r => r.Id);

        // Maximale Regalfachkapazität auf Datenbankebene absichern
        builder.ToTable(t => t.HasCheckConstraint(
            "CK_StorageLocations_MaxCapacity",
            "\"MaxCapacity\" >= 1"));

        // Regalfachcode ist verpflichtend
        builder.Property(r => r.Code)
            .IsRequired();

        // Jeder Regalfachcode darf nur einmal existieren
        builder.HasIndex(r => r.Code)
            .IsUnique();

        // Maximale Kapazität eines Regalfachs
        builder.Property(r => r.MaxCapacity)
            .IsRequired()
            .HasDefaultValue(10);
    }
}
