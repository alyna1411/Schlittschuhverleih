namespace backend.Application.DTOs.Storage;

public class StorageLocationResponseDto
{
    public int Id { get; set; }

    public string Code { get; set; } = string.Empty;

    public int MaxCapacity { get; set; }

    public int OccupiedPairs { get; set; }

    public int FreeCapacity { get; set; }
}
