using backend.Application.Interfaces;
using backend.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories;

public class StorageRepository : IStorageRepository
{
    private readonly SkateDbContext _db;

    public StorageRepository(SkateDbContext db)
    {
        _db = db;
    }

    // Alle Regalfächer inklusive aktueller Belegung laden
    public async Task<List<StorageOccupancy>>
        GetAllWithOccupancyAsync()
    {
        return await _db.StorageLocations
            .AsNoTracking()
            .OrderBy(r => r.Code)
            .Select(r => new StorageOccupancy(
                r.Id,
                r.Code,
                r.MaxCapacity,
                0))
            .ToListAsync();
    }
}