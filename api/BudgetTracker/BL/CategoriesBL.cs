using AutoMapper;
using BudgetTracker.BL.Interfaces;
using BudgetTracker.DAL.Interfaces;
using BudgetTracker.DTOs;
using BudgetTracker.Models;
using BudgetTracker.Models.Enums;
using BudgetTracker.Profiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace BudgetTracker.BL
{
    public class CategoriesBL : ICategoriesBL
    {
        private readonly ICategoriesDAL _categoriesDAL;
        private readonly IMonthExpendituresDAL _monthExpenditureDAL;
        private readonly ITransactionsDAL _transactionsDAL;
        private readonly IMapper _mapper;

        public CategoriesBL(ICategoriesDAL categoryExpenseDAL, IMonthExpendituresDAL monthExpendituresDAL, ITransactionsDAL transactionsDAL, IMapper mapper)
        {
            _categoriesDAL = categoryExpenseDAL;
            _monthExpenditureDAL = monthExpendituresDAL;
            _transactionsDAL = transactionsDAL;
            _mapper = mapper;
        }

        public bool DeleteCategoryExpenseById(int categoryExpenseId)
        {
            throw new NotImplementedException();
        }

        public DataResult GetCategoryStatuses(string userId)
        {
            List<string> validationMessages = new List<string>();
            bool success = false;
            List<CategoryStatusDto> categoryStatusDtos = MapCategoryStatuses(userId);

            if (categoryStatusDtos != null)
            {
                success = true;
            }
            else
            {
                validationMessages.Add("Cannot get category information. Please refresh page.");
            }

            return new DataResult(categoryStatusDtos, success, validationMessages);
        }

        /*
        public DataResult UpdateCategoryExpense(CategoryExpenseDto categoryExpenseDto)
        {
            CategoryExpense categoryExpense = _categoriesDAL.GetCategoryExpenseById(categoryExpenseDto.CategoryExpenseId);

            if (categoryExpense != null)
            {
                if (Decimal.Compare(categoryExpense.UpperBudgetAmount, categoryExpenseDto.UpperBudgetAmount) != 0 || Decimal.Compare(categoryExpense.LowerBudgetAmount, categoryExpenseDto.LowerBudgetAmount) != 0)
                {
                    decimal updatedLowerBudgetAmount = categoryExpenseDto.LowerBudgetAmount;
                    decimal updatedUpperBudgetAmount = categoryExpenseDto.UpperBudgetAmount;

                    _categoriesDAL.UpdateCategoryExpenseBudgetLimits(categoryExpenseDto.CategoryExpenseId, updatedUpperBudgetAmount, updatedLowerBudgetAmount);
                }
                else if (Decimal.Compare(categoryExpense.AmountLeft, categoryExpenseDto.AmountLeft) != 0 || Decimal.Compare(categoryExpense.AmountSpent, categoryExpenseDto.AmountSpent) != 0)
                {
                    decimal updatedAmountLeft = categoryExpenseDto.AmountLeft;
                    decimal updatedAmountSpent = categoryExpenseDto.AmountSpent;

                    _categoriesDAL.UpdateCategoryExpenseAmountSpentAndAmountLeft(categoryExpenseDto.CategoryExpenseId, updatedAmountSpent, updatedAmountLeft);
                }
            }

            CategoryExpense updatedCategoryExpense = _categoriesDAL.GetCategoryExpenseById(categoryExpenseDto.CategoryExpenseId);

            if (updatedCategoryExpense != null)
            {
                CategoryExpenseDto mappedCategoryExpense = _mapper.Map<CategoryExpenseDto>(updatedCategoryExpense);

                return mappedCategoryExpense;
            }

            return null;
        }
        */

        public DataResult UpdateCategoryExpenseBudgetLimits(CategoryExpenseDto categoryExpenseDto)
        {
            List<string> validationMessages = new List<string>();
            bool success = false;
            CategoryExpenseDto mappedCategoryExpense = null;

            CategoryExpense categoryExpense = _categoriesDAL.UpdateCategoryExpenseBudgetLimits(categoryExpenseDto.CategoryExpenseId, categoryExpenseDto.UpperBudgetAmount, categoryExpenseDto.LowerBudgetAmount);
            decimal updatedAmountLeft = categoryExpense.UpperBudgetAmount - categoryExpense.AmountSpent;

            if (updatedAmountLeft < 0)
            {
                updatedAmountLeft = 0;
            }

            categoryExpense = _categoriesDAL.UpdateCategoryExpenseAmountSpentAndAmountLeft(categoryExpenseDto.CategoryExpenseId, categoryExpense.AmountSpent, updatedAmountLeft);

            if (categoryExpense != null)
            {
                List<Transaction> transactions = _transactionsDAL.GetTransactionsByCategoryExpenseId(categoryExpense.CategoryExpenseId).OrderByDescending(t => t.Date).ToList();
                categoryExpense.Transactions = transactions;

                mappedCategoryExpense = _mapper.Map<CategoryExpenseDto>(categoryExpense);

                if (mappedCategoryExpense != null)
                {
                    success = true;
                }
            }

            if (!success)
            {
                validationMessages.Add("Could not update budget limits. Please refresh page and try again.");
            }

            return new DataResult(mappedCategoryExpense, success, validationMessages);
        }

        public CategoryExpenseDto UpdateCategoryExpenseAmountSpentAndAmountLeft(CategoryExpenseDto categoryExpenseDto)
        {
            CategoryExpense categoryExpense = _categoriesDAL.UpdateCategoryExpenseAmountSpentAndAmountLeft(categoryExpenseDto.CategoryExpenseId, categoryExpenseDto.AmountSpent, categoryExpenseDto.AmountLeft);

            if (categoryExpense != null)
            {
                CategoryExpenseDto mappedCategoryExpense = _mapper.Map<CategoryExpenseDto>(categoryExpense);

                return mappedCategoryExpense;
            }
            return null;
        }

        public DataResult UpdateCategoryStatuses(string userId, List<CategoryStatusDto> categoryStatusDtos)
        {
            List<string> validationMessages = new List<string>();
            bool success = false;
            CategoryData categoryData = _categoriesDAL.GetCategoryData(userId);
            MonthExpenditure activeMonthExpenditure = _monthExpenditureDAL.GetActiveMonthExpenditure(userId);
            CategoryDataDto categoryDataDto = null;

            if (activeMonthExpenditure != null)
            {
                List<CategoryExpense> categoryExpenses = _categoriesDAL.GetCategoryExpensesByMonthExpenditureId(activeMonthExpenditure.MonthExpenditureId).ToList();
                bool updateStatus = true;

                foreach (var categoryStatus in categoryStatusDtos.Where(cs => cs.State != State.Unchanged))
                {
                    if (categoryStatus.State == State.Unchanged)
                    {
                        continue;
                    }
                    else if (categoryStatus.State == State.Added)
                    {
                        CategoryExpense categoryExpense = _categoriesDAL.CreateCategoryExpense(userId, categoryStatus.CategoryTypeId, activeMonthExpenditure.MonthExpenditureId);
                        updateStatus = (categoryExpense == null) ? false : true;
                    }
                    else if (categoryStatus.State == State.Deleted)
                    {
                        CategoryExpense categoryExpense = categoryExpenses.FirstOrDefault(ce => ce.CategoryTypeId == categoryStatus.CategoryTypeId);
                        updateStatus = _categoriesDAL.DeleteCategoryExpense(categoryExpense.CategoryExpenseId);
                    }

                    updateStatus = _categoriesDAL.UpdateCategoryStatus(userId, categoryStatus.CategoryTypeId, categoryStatus.IsActive);
                }

                if (updateStatus)
                {
                    List<CategoryStatusDto> categoryStatuses = MapCategoryStatuses(userId);
                    categoryExpenses = _categoriesDAL.GetCategoryExpensesByMonthExpenditureId(activeMonthExpenditure.MonthExpenditureId).OrderBy(ce => ce.CategoryTypeId).ToList();

                    foreach (CategoryExpense categoryExpense in categoryExpenses)
                    {
                        List<Transaction> transactions = _transactionsDAL.GetTransactionsByCategoryExpenseId(categoryExpense.CategoryExpenseId).OrderByDescending(t => t.Date).ToList();
                        categoryExpense.Transactions = transactions;
                    }

                    List<CategoryExpenseDto> mappedCategoryExpense = _mapper.Map<List<CategoryExpenseDto>>(categoryExpenses);

                    categoryDataDto = new CategoryDataDto()
                    {
                        CategoryExpenses = mappedCategoryExpense,
                        CategoryStatuses = categoryStatuses
                    };
                }

                success = updateStatus;
            }

            if (!success)
            {
                validationMessages.Add("Cannot update category settings. Please refresh page and try again.");
            }

            return new DataResult(categoryDataDto, success, validationMessages);
        }

        private List<CategoryStatusDto> MapCategoryStatuses(string userId)
        {
            CategoryData categoryData = _categoriesDAL.GetCategoryData(userId);

            var categories = Enum.GetValues(typeof(Category)).Cast<Category>();
            var categoryDataDictionary = categoryData.GetType().GetProperties().ToDictionary(prop => prop.Name, prop => prop.GetValue(categoryData, null));

            List<CategoryStatusDto> categoryStatusDtos = new List<CategoryStatusDto>();

            foreach (var category in categories)
            {
                string categoryName = Enum.GetName(typeof(Category), category);
                bool isActive = (bool)categoryDataDictionary[categoryName];

                CategoryStatusDto categoryStatus = new CategoryStatusDto()
                {
                    CategoryName = categoryName,
                    CategoryTypeId = category,
                    IsActive = isActive,
                    State = State.Unchanged
                };

                categoryStatusDtos.Add(categoryStatus);
            }

            return categoryStatusDtos;
        }
    }
}
