using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace BudgetTracker.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoryData",
                columns: table => new
                {
                    CategoryDataId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(nullable: false),
                    Food = table.Column<bool>(nullable: false),
                    Transportation = table.Column<bool>(nullable: false),
                    Grocery = table.Column<bool>(nullable: false),
                    Health = table.Column<bool>(nullable: false),
                    Entertainment = table.Column<bool>(nullable: false),
                    Bill = table.Column<bool>(nullable: false),
                    Other = table.Column<bool>(nullable: false),
                    LastModifiedTimeStamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryData", x => x.CategoryDataId);
                });

            migrationBuilder.CreateTable(
                name: "CategoryExpenses",
                columns: table => new
                {
                    CategoryExpenseId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CategoryTypeId = table.Column<int>(nullable: false),
                    MonthExpenditureId = table.Column<int>(nullable: false),
                    EffectiveStart = table.Column<DateTime>(nullable: false),
                    EffectiveEnd = table.Column<DateTime>(nullable: false),
                    AmountSpent = table.Column<decimal>(nullable: false),
                    AmountLeft = table.Column<decimal>(nullable: false),
                    LowerBudgetAmount = table.Column<decimal>(nullable: false),
                    UpperBudgetAmount = table.Column<decimal>(nullable: false),
                    LastModifiedTimeStamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryExpenses", x => x.CategoryExpenseId);
                });

            migrationBuilder.CreateTable(
                name: "MonthExpenditures",
                columns: table => new
                {
                    MonthExpenditureId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(nullable: false),
                    EffectiveDate = table.Column<DateTime>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    LastModifiedTimeStamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonthExpenditures", x => x.MonthExpenditureId);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    TransactionId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CategoryExpenseId = table.Column<int>(nullable: false),
                    MonthExpenditureId = table.Column<int>(nullable: false),
                    Title = table.Column<string>(maxLength: 100, nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Cost = table.Column<decimal>(nullable: false),
                    LastModifiedTimeStamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.TransactionId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    LastModifiedTimeStamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryData");

            migrationBuilder.DropTable(
                name: "CategoryExpenses");

            migrationBuilder.DropTable(
                name: "MonthExpenditures");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
