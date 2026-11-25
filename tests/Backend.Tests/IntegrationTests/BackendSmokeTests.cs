using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using Xunit;

namespace Backend.Tests.IntegrationTests;

public class BackendSmokeTests
{
    [Fact]
    public async Task OpenApiEndpoint_ReturnsOk()
    {
        // Arrange
        using var factory = new WebApplicationFactory<Program>();
        using var client = factory.CreateClient();

        // Act
        var response = await client.GetAsync("/openapi/v1.json");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}