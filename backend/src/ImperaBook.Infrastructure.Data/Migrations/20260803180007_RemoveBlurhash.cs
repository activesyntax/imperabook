using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ImperaBook.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class RemoveBlurhash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "ck_books_cover_complete",
                table: "books");

            migrationBuilder.DropColumn(
                name: "Blurhash",
                table: "images");

            migrationBuilder.DropColumn(
                name: "CoverBlurhash",
                table: "books");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Blurhash",
                table: "images",
                type: "character varying(166)",
                maxLength: 166,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CoverBlurhash",
                table: "books",
                type: "character varying(166)",
                maxLength: 166,
                nullable: true);

            migrationBuilder.AddCheckConstraint(
                name: "ck_books_cover_complete",
                table: "books",
                sql: "(\"CoverHash\" IS NULL) = (\"CoverBlurhash\" IS NULL)");
        }
    }
}
