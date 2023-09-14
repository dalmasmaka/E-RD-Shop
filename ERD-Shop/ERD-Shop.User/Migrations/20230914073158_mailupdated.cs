using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERD_Shop.User.Migrations
{
    public partial class mailupdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "17e58741-3356-4e82-beb3-86326cd5bc36");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6e4bd83c-9a52-42ff-ab35-2ddc2ae899a4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7452357c-0975-4f3c-95aa-258f56ced875");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "854002d3-6a7d-4401-9ba2-383e16dbf59d", "3", "Store Keeper", "Store Keeper" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "9ab73433-c32b-4585-85e8-a49e107c4c4e", "2", "User", "User" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e361e0b9-47dc-431c-9b8b-c2048d8e1960", "1", "Admin", "Admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "854002d3-6a7d-4401-9ba2-383e16dbf59d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ab73433-c32b-4585-85e8-a49e107c4c4e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e361e0b9-47dc-431c-9b8b-c2048d8e1960");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "17e58741-3356-4e82-beb3-86326cd5bc36", "3", "Store Keeper", "Store Keeper" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "6e4bd83c-9a52-42ff-ab35-2ddc2ae899a4", "2", "User", "User" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "7452357c-0975-4f3c-95aa-258f56ced875", "1", "Admin", "Admin" });
        }
    }
}
