using BudgetTracker.DAL.DbContexts;
using BudgetTracker.DAL.Interfaces;
using BudgetTracker.Models;
using BudgetTracker.Models.Enums;
using BudgetTracker.Profiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DAL
{
    public class CategoryExpensesDAL : ICategoriesDAL
    {
        private readonly BudgetTrackerContext _context;

        public CategoryExpensesDAL(BudgetTrackerContext context)
        {
            _context = context;
        }
        public CategoryExpense GetCategoryExpenseById(int id)
        {
            CategoryExpense categoryExpenses = _context.CategoryExpenses.FirstOrDefault(ce => ce.CategoryExpenseId == id);

            return categoryExpenses;
        }

        public CategoryData GetCategoryData(string user)
        {
            CategoryData categoryData = _context.CategoryData.FirstOrDefault(cd => cd.UserId == user);

            return categoryData;
        }

        public IEnumerable<CategoryExpense> GetCategoryExpensesByMonthExpenditureId(int monthExpenditureId)
        {
            IEnumerable<CategoryExpense> categoryExpenses = _context.CategoryExpenses.Where(ce => ce.MonthExpenditureId == monthExpenditureId);

            return categoryExpenses;
        }

        public CategoryData CreateCategoryData(string userId)
        {
            CategoryData categoryData = new CategoryData()
            {
                UserId = userId,
                Food = true,
                Transportation = true,
                Grocery = true,
                Health = true,
                Entertainment = true,
                Bill = true,
                Other = true,
                LastModifiedTimeStamp = DateTime.Now
            };

            _context.CategoryData.Add(categoryData);
            _context.SaveChanges();

            return categoryData;
        }

        public CategoryExpense CreateCategoryExpense(string userId, Category categoryTypeId, int monthExpenditureId)
        {
            DateTime effectiveStart = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            int daysInMonth = DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month);
            DateTime effectiveEnd = new DateTime(DateTime.Now.Year, DateTime.Now.Month, daysInMonth);

            decimal defaultLowerBudgetAmount = new decimal(0);
            decimal defaultUpperBudgetAmount = new decimal(100);

            CategoryExpense categoryExpense = new CategoryExpense()
            {
                CategoryTypeId = categoryTypeId,
                MonthExpenditureId = monthExpenditureId,
                EffectiveStart = effectiveStart,
                EffectiveEnd = effectiveEnd,
                AmountSpent = defaultLowerBudgetAmount,
                AmountLeft = defaultUpperBudgetAmount,
                LowerBudgetAmount = defaultLowerBudgetAmount,
                UpperBudgetAmount = defaultUpperBudgetAmount,
                Transactions = new List<Transaction>(),
                LastModifiedTimeStamp = DateTime.Now
            };

            _context.CategoryExpenses.Add(categoryExpense);
            _context.SaveChanges();

            return categoryExpense;
        }

        public bool DeleteCategoryExpense(int categoryExpenseId)
        {
            CategoryExpense categoryExpense = _context.CategoryExpenses.FirstOrDefault(ce => ce.CategoryExpenseId == categoryExpenseId);

            if (categoryExpense != null)
            {
                _context.CategoryExpenses.Remove(categoryExpense);
                _context.SaveChanges();

                return true;
            }

            return false;
        }

        public bool UpdateCategoryStatus(string userId, Category category, bool value)
        {
            CategoryData categoryData = _context.CategoryData.FirstOrDefault(cd => cd.UserId == userId);

            if (categoryData != null)
            {
                categoryData.LastModifiedTimeStamp = DateTime.Now;

                switch (category)
                {
                    case Category.Food:
                    {
                        categoryData.Food = value;
                        break;
                    }
                    case Category.Transportation:
                    {
                        categoryData.Transportation = value;
                        break;
                    }
                    case Category.Grocery:
                    {
                        categoryData.Grocery = value;
                        break;
                    }
                    case Category.Health:
                    {
                        categoryData.Health = value;
                        break;
                    }
                    case Category.Bill:
                    {
                        categoryData.Bill = value;
                        break;
                    }
                    case Category.Other:
                    {
                        categoryData.Other = value;
                        break;
                    }
                }

                _context.CategoryData.Update(categoryData);
                _context.SaveChanges();

                return true;
            }

            return false;
        }

        public CategoryExpense UpdateCategoryExpenseBudgetLimits(int categoryExpenseId, decimal upperBudgetAmount, decimal lowerBudgetAmount)
        {
            CategoryExpense categoryExpense = _context.CategoryExpenses.FirstOrDefault(ce => ce.CategoryExpenseId == categoryExpenseId);

            if (categoryExpense != null)
            {
                categoryExpense.LastModifiedTimeStamp = DateTime.Now;
                categoryExpense.UpperBudgetAmount = upperBudgetAmount;
                categoryExpense.LowerBudgetAmount = lowerBudgetAmount;

                _context.CategoryExpenses.Update(categoryExpense);
                _context.SaveChanges();

                return categoryExpense;
            }

            return null;
        }

        public CategoryExpense UpdateCategoryExpenseAmountSpentAndAmountLeft(int categoryExpenseId, decimal amountSpent, decimal amountLeft)
        {
            CategoryExpense categoryExpense = _context.CategoryExpenses.FirstOrDefault(ce => ce.CategoryExpenseId == categoryExpenseId);

            if (categoryExpense != null)
            {
                categoryExpense.LastModifiedTimeStamp = DateTime.Now;
                categoryExpense.AmountSpent = amountSpent;
                categoryExpense.AmountLeft = amountLeft;

                _context.CategoryExpenses.Update(categoryExpense);
                _context.SaveChanges();

                return categoryExpense;
            }

            return null;
        }
    }
}
