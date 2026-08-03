using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ImperaBook.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "covers");

            migrationBuilder.CreateTable(
                name: "images",
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
                    ByteSize = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(
                        type: "timestamp with time zone",
                        nullable: false,
                        defaultValueSql: "now()"
                    ),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_images", x => x.Hash);
                }
            );

            // EF Core cannot express column storage strategy, so this stays hand-written — do not remove
            // when regenerating migrations.
            migrationBuilder.Sql(
                """ALTER TABLE images ALTER COLUMN "Bytes" SET STORAGE EXTERNAL;"""
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "images");

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
                    CreatedAt = table.Column<DateTimeOffset>(
                        type: "timestamp with time zone",
                        nullable: false,
                        defaultValueSql: "now()"
                    ),
                    MediaType = table.Column<string>(
                        type: "character varying(100)",
                        maxLength: 100,
                        nullable: false
                    ),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_covers", x => x.Hash);
                }
            );
        }
    }
}
