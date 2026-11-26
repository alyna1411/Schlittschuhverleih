using System.Net;
using Xunit;
using backend.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Tests.IntegrationTests;

public class BackendSmokeTests
{
    [Fact]
    public async Task OpenApiEndpoint_ReturnsOk()
    {
        // Arrange
        using var factory = new TestWebApplicationFactory();
        using var client = factory.CreateClient();

        // Act
        var response = await client.GetAsync("/openapi/v1.json");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task Database_IsReachableAndMigrated()
    {
        // Arrange
        using var factory = new TestWebApplicationFactory();
        using var scope = factory.Services.CreateScope();

        var db = scope.ServiceProvider
            .GetRequiredService<SkateDbContext>();

        // Act
        var canConnect = await db.Database.CanConnectAsync();
        var pendingMigrations = await db.Database.GetPendingMigrationsAsync();

        // Assert
        Assert.True(canConnect);
        Assert.Empty(pendingMigrations);

        Assert.StartsWith(
            "skates-test-",
            Path.GetFileName(db.Database.GetDbConnection().DataSource)
        );
    }
}