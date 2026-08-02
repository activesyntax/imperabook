using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ImperaBook.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCovers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CoverBlurhash",
                table: "books",
                type: "character varying(166)",
                maxLength: 166,
                nullable: true
            );

            migrationBuilder.AddColumn<string>(
                name: "CoverHash",
                table: "books",
                type: "character(64)",
                fixedLength: true,
                maxLength: 64,
                nullable: true
            );

            migrationBuilder.CreateTable(
                name: "covers",
                columns: table => new
                {
                    Hash = table.Column<string>(
                        type: "character(64)",
                        fixedLength: true,
                        maxLength: 64,
                        nullable: false
                    ),
                    Blurhash = table.Column<string>(
                        type: "character varying(166)",
                        maxLength: 166,
                        nullable: false
                    ),
                    Bytes = table.Column<byte[]>(type: "bytea", nullable: false),
                    MediaType = table.Column<string>(
                        type: "character varying(100)",
                        maxLength: 100,
                        nullable: false
                    ),
                    CreatedAt = table.Column<DateTimeOffset>(
                        type: "timestamp with time zone",
                        nullable: false,
                        defaultValueSql: "now()"
                    ),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_covers", x => x.Hash);
                }
            );

            migrationBuilder.AddCheckConstraint(
                name: "ck_books_cover_complete",
                table: "books",
                sql: "(\"CoverHash\" IS NULL) = (\"CoverBlurhash\" IS NULL)"
            );

            migrationBuilder.Sql(
                """ALTER TABLE covers ALTER COLUMN "Bytes" SET STORAGE EXTERNAL;"""
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "covers");

            migrationBuilder.DropCheckConstraint(name: "ck_books_cover_complete", table: "books");

            migrationBuilder.DropColumn(name: "CoverBlurhash", table: "books");

            migrationBuilder.DropColumn(name: "CoverHash", table: "books");
        }
    }
}
