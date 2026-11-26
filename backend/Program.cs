using backend.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Datenbankverbindung konfigurieren
var connectionString = builder.Configuration
    .GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Datenbankverbindung fehlt.");

var relativePath = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder(connectionString).DataSource;

var databasePath = Path.GetFullPath(
    Path.Combine(builder.Environment.ContentRootPath, relativePath)
);

Directory.CreateDirectory(Path.GetDirectoryName(databasePath)!);

// DbContext mit SQLite registrieren
builder.Services.AddDbContext<SkateDbContext>(options =>
    options.UseSqlite($"Data Source={databasePath}")
);

// Controllers für REST-API registrieren
builder.Services.AddControllers();

// OpenAPI-Beschreibung für die Entwicklung bereitstellen
builder.Services.AddOpenApi();

var app = builder.Build();

// Datenbankmigrationen beim Anwendungsstart anwenden
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider
        .GetRequiredService<SkateDbContext>();

    await db.Database.MigrateAsync();
}

// OpenAPI in der Entwicklungsumgebung aktivieren
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapControllers();

app.Run();

// Integrationstests zugänglich machen
public partial class Program { }
