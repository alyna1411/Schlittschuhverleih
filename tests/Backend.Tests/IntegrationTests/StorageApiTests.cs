using System.Net;
using System.Net.Http.Json;
using backend.Application.DTOs.Storage;
using Xunit;

namespace Backend.Tests.IntegrationTests;

// Integrationstests für die Lagerverwaltungs-API
public class StorageApiTests
{
    // API liefert alle 27 Regalfächer mit korrekten Kapazitäten
    [Fact]
    public async Task GetStorage_ShouldReturnAllStorageLocations()
    {
        // Arrange
        using var factory = new TestWebApplicationFactory();
        using var client = factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/storage");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var locations = await response.Content
            .ReadFromJsonAsync<List<StorageLocationResponseDto>>();

        Assert.NotNull(locations);
        Assert.Equal(27, locations.Count);

        var expectedCodes =
            (from letter in "ABC"
             from row in Enumerable.Range(1, 3)
             from column in Enumerable.Range(1, 3)
             select $"{letter}{row}.{column}").ToList();

        Assert.Equal(expectedCodes, locations.Select(r => r.Code));

        Assert.All(locations, location =>
        {
            Assert.True(location.Id > 0);
            Assert.Equal(10, location.MaxCapacity);
            Assert.Equal(0, location.OccupiedPairs);
            Assert.Equal(10, location.FreeCapacity);
        });
    }
}