using BudgetTracker.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.BL.Interfaces
{
    public interface ICategoriesBL
    {
        //DataResult UpdateCategoryExpense(CategoryExpenseDto categoryExpenseDto);
        DataResult GetCategoryStatuses(string userId);
        DataResult UpdateCategoryStatuses(string userId, List<CategoryStatusDto> categoryStatusDtos);
        DataResult UpdateCategoryExpenseBudgetLimits(CategoryExpenseDto categoryExpenseDto);
        CategoryExpenseDto UpdateCategoryExpenseAmountSpentAndAmountLeft(CategoryExpenseDto categoryExpenseDto);
    }
}
