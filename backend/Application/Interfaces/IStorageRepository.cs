namespace backend.Application.Interfaces;

public record StorageOccupancy(
    int Id,
    string Code,
    int MaxCapacity,
    int OccupiedPairs);

public interface IStorageRepository
{
    // Alle Regalfächer mit ihrer aktuellen Belegung laden
    Task<List<StorageOccupancy>> GetAllWithOccupancyAsync();
}
