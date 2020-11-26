using BudgetTracker.Models;
using BudgetTracker.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DAL.Interfaces
{
    public interface ICategoriesDAL
    {
        CategoryExpense GetCategoryExpenseById(int categoryExpenseId);
        CategoryData GetCategoryData(string userId);
        IEnumerable<CategoryExpense> GetCategoryExpensesByMonthExpenditureId(int monthExpenditureId);
        CategoryData CreateCategoryData(string userId);
        CategoryExpense CreateCategoryExpense(string userId, Category categoryTypeId, int monthExpenditureId);
        bool DeleteCategoryExpense(int categoryExpenseId);
        bool UpdateCategoryStatus(string userId, Category category, bool value);
        CategoryExpense UpdateCategoryExpenseBudgetLimits(int categoryExpenseId, decimal upperBudgetAmount, decimal lowerBudgetAmount);
        CategoryExpense UpdateCategoryExpenseAmountSpentAndAmountLeft(int categoryExpenseId, decimal amountSpent, decimal amountLeft);
    }
}
