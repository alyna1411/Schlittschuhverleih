using backend.Infrastructure.Persistence;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Backend.Tests.IntegrationTests;

// Stellt für jeden Integrationstest eine eigene SQLite-Testdatenbank bereit
public sealed class TestDatabase : IAsyncDisposable
{
    private readonly SqliteConnection _connection;

    public SkateDbContext Context { get; }

    private TestDatabase(
        SqliteConnection connection,
        SkateDbContext context)
    {
        _connection = connection;
        Context = context;
    }

    // Neue SQLite-Testdatenbank im Arbeitsspeicher erstellen
    public static async Task<TestDatabase> CreateAsync()
    {
        // Datenbankverbindung erstellen und offen halten
        var connection = new SqliteConnection("Data Source=:memory:");
        await connection.OpenAsync();

        // EF Core für die Testdatenbank konfigurieren
        var options = new DbContextOptionsBuilder<SkateDbContext>()
            .UseSqlite(connection)
            .Options;

        var context = new SkateDbContext(options);

        // Benötigte Datenbanktabellen für den Test erstellen
        await context.Database.EnsureCreatedAsync();

        return new TestDatabase(connection, context);
    }

    // Testdatenbank und Datenbankverbindung nach dem Test freigeben
    public async ValueTask DisposeAsync()
    {
        await Context.DisposeAsync();
        await _connection.DisposeAsync();
    }
}
