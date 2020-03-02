using Microsoft.EntityFrameworkCore.Migrations;

namespace ArtStore.Data.Migrations
{
    public partial class AddYearToArtwork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Artwork",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Year",
                table: "Artwork");
        }
    }
}
