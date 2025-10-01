using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskBoard.API.Migrations
{
    /// <inheritdoc />
    public partial class addedColumnPending : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isPending",
                table: "Tasks",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isPending",
                table: "Tasks");
        }
    }
}
