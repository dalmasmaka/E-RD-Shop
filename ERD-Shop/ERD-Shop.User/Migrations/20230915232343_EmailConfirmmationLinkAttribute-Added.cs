using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERD_Shop.User.Migrations
{
    public partial class EmailConfirmmationLinkAttributeAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1fd9af79-b0c0-4ca0-ba95-f9fe241d5ba9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "495b3467-29e0-4f6f-8488-459aed113df9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9c9d5f3b-6b47-4dd0-90c9-865d9e3dbb8f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "47e48a50-afa4-463d-bb4a-e39b5be41fd0", "3", "Store Keeper", "Store Keeper" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "709229d2-05b4-4065-8e98-6f9f15ed5be9", "2", "User", "User" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "df725b38-1e25-4d65-a805-069530f7e101", "1", "Admin", "Admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "47e48a50-afa4-463d-bb4a-e39b5be41fd0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "709229d2-05b4-4065-8e98-6f9f15ed5be9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "df725b38-1e25-4d65-a805-069530f7e101");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1fd9af79-b0c0-4ca0-ba95-f9fe241d5ba9", "1", "Admin", "Admin" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "495b3467-29e0-4f6f-8488-459aed113df9", "3", "Store Keeper", "Store Keeper" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "9c9d5f3b-6b47-4dd0-90c9-865d9e3dbb8f", "2", "User", "User" });
        }
    }
}
