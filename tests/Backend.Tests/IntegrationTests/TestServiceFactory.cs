using backend.Application.Services;
using backend.Infrastructure.Persistence;
using backend.Infrastructure.Repositories;

namespace Backend.Tests.IntegrationTests;

// Erstellt Application-Services mit echten Repository-Implementierungen
// und einem gemeinsamen SkateDbContext
public static class TestServiceFactory
{
    public static StorageService CreateStorageService(SkateDbContext db)
    {
        return new StorageService(
            new StorageRepository(db));
    }
}