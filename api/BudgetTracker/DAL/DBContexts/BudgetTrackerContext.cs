using BudgetTracker.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DAL.DbContexts
{
    public class BudgetTrackerContext : DbContext
    {
        public BudgetTrackerContext(DbContextOptions<BudgetTrackerContext> opt) : base(opt) { }

        public DbSet<UserData> Users { get; set; }
        public DbSet<CategoryData> CategoryData { get; set; }
        public DbSet<CategoryExpense> CategoryExpenses { get; set; }
        public DbSet<MonthExpenditure> MonthExpenditures { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
