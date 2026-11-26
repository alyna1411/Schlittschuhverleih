using backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Persistence.Seed;

public static class StorageLocationSeeder
{
    public static async Task SeedAsync(SkateDbContext db)
    {
        // Bereits vorhandene Regalfachcodes ermitteln
        var existingCodes = await db.StorageLocations
            .Select(r => r.Code)
            .ToListAsync();

        var existing = existingCodes.ToHashSet();

        // Alle 27 Regalfächer erzeugen
        var locations = new List<StorageLocation>();

        foreach (char letter in "ABC")
        {
            for (int row = 1; row <= 3; row++)
            {
                for (int column = 1; column <= 3; column++)
                {
                    string code = $"{letter}{row}.{column}";

                    // Bereits vorhandene Regalfächer überspringen
                    if (existing.Contains(code))
                        continue;

                    locations.Add(new StorageLocation
                    {
                        Code = code,
                        MaxCapacity = 10
                    });
                }
            }
        }

        // Nur neue Regalfächer speichern
        if (locations.Count > 0)
        {
            db.StorageLocations.AddRange(locations);
            await db.SaveChangesAsync();
        }
    }
}
