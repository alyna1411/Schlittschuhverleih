using backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Persistence;

public class SkateDbContext : DbContext
{
    public SkateDbContext(DbContextOptions<SkateDbContext> options)
        : base(options)
    {
    }

    public DbSet<StorageLocation> StorageLocations =>
        Set<StorageLocation>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Standardkonfiguration von EF Core übernehmen
        base.OnModelCreating(modelBuilder);

        // Entity-Konfigurationsklassen automatisch laden
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(SkateDbContext).Assembly
        );
    }
}