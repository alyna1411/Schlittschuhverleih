using backend.Application.DTOs.Storage;
using backend.Application.Interfaces;

namespace backend.Application.Services;

public class StorageService
{
    private readonly IStorageRepository _storageRepository;

    public StorageService(IStorageRepository storageRepository)
    {
        _storageRepository = storageRepository;
    }

    // Alle Regalfächer mit Belegung und freien Slots abrufen
    public async Task<List<StorageLocationResponseDto>> GetAllAsync()
    {
        var locations =
            await _storageRepository.GetAllWithOccupancyAsync();

        return locations.Select(location =>
            new StorageLocationResponseDto
            {
                Id = location.Id,
                Code = location.Code,
                MaxCapacity = location.MaxCapacity,
                OccupiedPairs = location.OccupiedPairs,
                FreeCapacity =
                    location.MaxCapacity - location.OccupiedPairs
            }).ToList();
    }
}
