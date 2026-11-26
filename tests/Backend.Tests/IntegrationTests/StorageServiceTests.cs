using backend.Infrastructure.Persistence.Seed;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Backend.Tests.IntegrationTests;

// Integrationstests für die Lagerverwaltung
public class StorageServiceTests
{
    // Seeder erzeugt alle 27 Regalfächer
    [Fact]
    public async Task Seeder_ShouldCreateAllStorageLocations()
    {
        await using var db = await TestDatabase.CreateAsync();

        await StorageLocationSeeder.SeedAsync(db.Context);

        var locations = await db.Context.StorageLocations.ToListAsync();

        Assert.Equal(27, locations.Count);
        Assert.Equal(27, locations.Select(r => r.Code).Distinct().Count());
        Assert.All(locations, r => Assert.Equal(10, r.MaxCapacity));
    }

    // Wiederholtes Seeding erzeugt keine Duplikate
    [Fact]
    public async Task Seeder_ShouldNotCreateDuplicates()
    {
        await using var db = await TestDatabase.CreateAsync();

        await StorageLocationSeeder.SeedAsync(db.Context);
        await StorageLocationSeeder.SeedAsync(db.Context);

        Assert.Equal(27, await db.Context.StorageLocations.CountAsync());
    }

    // Service liefert alle Regalfächer mit korrekter Kapazität
    [Fact]
    public async Task GetAllAsync_ShouldReturnAllStorageLocations()
    {
        await using var db = await TestDatabase.CreateAsync();

        await StorageLocationSeeder.SeedAsync(db.Context);

        var service = TestServiceFactory.CreateStorageService(db.Context);

        var locations = await service.GetAllAsync();

        var expectedCodes =
            (from letter in "ABC"
             from row in Enumerable.Range(1, 3)
             from column in Enumerable.Range(1, 3)
             select $"{letter}{row}.{column}").ToList();

        Assert.Equal(27, locations.Count);
        Assert.Equal(expectedCodes, locations.Select(r => r.Code));

        Assert.All(locations, location =>
        {
            Assert.Equal(10, location.MaxCapacity);
            Assert.Equal(0, location.OccupiedPairs);
            Assert.Equal(10, location.FreeCapacity);
        });
    }
}