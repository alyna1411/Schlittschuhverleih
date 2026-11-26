using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Persistence;

public class SkateDbContext : DbContext
{
    public SkateDbContext(DbContextOptions<SkateDbContext> options)
        : base(options)
    {
    }
}