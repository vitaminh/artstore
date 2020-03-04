using Microsoft.EntityFrameworkCore.Migrations;

namespace ArtStore.Data.Migrations
{
    public partial class AddPriceToArtwork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Artwork",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Artwork");
        }
    }
}
