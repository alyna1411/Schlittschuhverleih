using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddStorageLocations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StorageLocations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Code = table.Column<string>(type: "TEXT", nullable: false),
                    MaxCapacity = table.Column<int>(type: "INTEGER", nullable: false, defaultValue: 10)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StorageLocations", x => x.Id);
                    table.CheckConstraint("CK_StorageLocations_MaxCapacity", "\"MaxCapacity\" >= 1");
                });

            migrationBuilder.CreateIndex(
                name: "IX_StorageLocations_Code",
                table: "StorageLocations",
                column: "Code",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StorageLocations");
        }
    }
}
