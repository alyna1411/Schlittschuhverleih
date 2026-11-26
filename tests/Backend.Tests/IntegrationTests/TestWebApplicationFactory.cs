using backend.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Backend.Tests.IntegrationTests;

// Stellt eine isolierte Anwendungsumgebung für Integrationstests bereit
public sealed class TestWebApplicationFactory
    : WebApplicationFactory<Program>
{
    private readonly string _databasePath = Path.Combine(
        Path.GetTempPath(),
        $"skates-test-{Guid.NewGuid():N}.db"
    );

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Reguläre DbContext-Konfiguration entfernen
            services.RemoveAll<SkateDbContext>();
            services.RemoveAll<DbContextOptions<SkateDbContext>>();
            services.RemoveAll<IDbContextOptionsConfiguration<SkateDbContext>>();

            // DbContext mit isolierter Testdatenbank registrieren
            services.AddDbContext<SkateDbContext>(options =>
                options.UseSqlite($"Data Source={_databasePath};Pooling=False")
            );
        });
    }

    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);

        if (disposing)
        {
            File.Delete(_databasePath);
            File.Delete(_databasePath + "-wal");
            File.Delete(_databasePath + "-shm");
        }
    }
}