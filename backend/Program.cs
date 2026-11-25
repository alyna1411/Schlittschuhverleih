var builder = WebApplication.CreateBuilder(args);

// Controllers für REST-API registrieren
builder.Services.AddControllers();

// OpenAPI-Beschreibung für die Entwicklung bereitstellen
builder.Services.AddOpenApi();

var app = builder.Build();

// OpenAPI in der Entwicklungsumgebung aktivieren
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapControllers();

app.Run();

// Integrationstests zugänglich machen
public partial class Program { }
