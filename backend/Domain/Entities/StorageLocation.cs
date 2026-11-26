namespace backend.Domain.Entities;

public class StorageLocation
{
    public int Id { get; set; }

    // Regalfachcode (A1.1 - C3.3)
    public string Code { get; set; } = string.Empty;

    // Maximale Anzahl Schlittschuhpaare pro Regalfach
    public int MaxCapacity { get; set; } = 10;
}