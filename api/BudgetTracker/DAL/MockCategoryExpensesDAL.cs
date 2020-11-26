using BudgetTracker.DAL.Interfaces;
using BudgetTracker.Models;
using BudgetTracker.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DAL
{
    public class MockCategoryExpensesDAL
    {
        private List<CategoryExpense> mockCategoryExpenses = new List<CategoryExpense>
        {
            new CategoryExpense() { CategoryExpenseId=1, CategoryTypeId=Category.Food, MonthExpenditureId=1, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=2, CategoryTypeId=Category.Transportation, MonthExpenditureId=1, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=3, CategoryTypeId=Category.Grocery, MonthExpenditureId=1, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=4, CategoryTypeId=Category.Health, MonthExpenditureId=1, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=5, CategoryTypeId=Category.Entertainment, MonthExpenditureId=1, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=6, CategoryTypeId=Category.Bill, MonthExpenditureId=1, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=7, CategoryTypeId=Category.Other, MonthExpenditureId=1, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },

            new CategoryExpense() { CategoryExpenseId=8, CategoryTypeId=Category.Food, MonthExpenditureId=2, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=9, CategoryTypeId=Category.Transportation, MonthExpenditureId=2, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=10, CategoryTypeId=Category.Grocery, MonthExpenditureId=2, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=11, CategoryTypeId=Category.Health, MonthExpenditureId=2, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=12, CategoryTypeId=Category.Entertainment, MonthExpenditureId=2, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=13, CategoryTypeId=Category.Bill, MonthExpenditureId=2, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=14, CategoryTypeId=Category.Other, MonthExpenditureId=2, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },

            new CategoryExpense() { CategoryExpenseId=15, CategoryTypeId=Category.Food, MonthExpenditureId=3, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=16, CategoryTypeId=Category.Transportation, MonthExpenditureId=3, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=17, CategoryTypeId=Category.Grocery, MonthExpenditureId=3, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=18, CategoryTypeId=Category.Health, MonthExpenditureId=3, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=19, CategoryTypeId=Category.Entertainment, MonthExpenditureId=3, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=20, CategoryTypeId=Category.Bill, MonthExpenditureId=3, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
            new CategoryExpense() { CategoryExpenseId=21, CategoryTypeId=Category.Other, MonthExpenditureId=3, EffectiveStart=new DateTime(2020, 1, 1, 0, 0, 0, 0), EffectiveEnd=new DateTime(2020, 1, 31, 23, 59, 59), AmountLeft=25.23M, AmountSpent=53.23M, LowerBudgetAmount=50.00M, UpperBudgetAmount=100.00M },
        };

        private CategoryData mockCategoryData = new CategoryData()
        {
            UserId = "1",
            Food = true,
            Transportation = true,
            Grocery = true,
            Health = true,
            Entertainment = true,
            Bill = true,
            Other = true
        };

        public CategoryExpense GetCategoryExpenseById(int id)
        {
            CategoryExpense categoryExpenses = mockCategoryExpenses.FirstOrDefault(ce => ce.CategoryExpenseId == id);

            return categoryExpenses;
        }

        public IEnumerable<CategoryExpense> GetCategoryExpensesByMonthExpenditureId(int monthExpenditureId)
        {
            IEnumerable<CategoryExpense> categoryExpenses = mockCategoryExpenses.Where(ce => ce.MonthExpenditureId == monthExpenditureId);

            return categoryExpenses;
        }

        public CategoryData GetCategoryData(string user)
        {
            CategoryData categoryData = mockCategoryData;

            return categoryData;
        }
    }
}
