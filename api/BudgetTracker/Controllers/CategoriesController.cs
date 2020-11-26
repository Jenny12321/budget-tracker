using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetTracker.BL.Interfaces;
using BudgetTracker.Controllers.Utils;
using BudgetTracker.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetTracker.Controllers
{
    [Route("api/Categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesBL _categoriesBL;

        public CategoriesController(ICategoriesBL categoriesBL)
        {
            _categoriesBL = categoriesBL;
        }

        /// <summary>
        /// Gets list of category status to determine which categories are in effect
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetCategoryStatuses")]
        [Authorize]
        public ActionResult<DataResult> GetCategoryStatuses()
        {
            string userId = UserUtil.GetUserId(HttpContext);

            DataResult result = _categoriesBL.GetCategoryStatuses(userId);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }

        /// <summary>
        /// Update category statuses and return updated list of category statuses
        /// </summary>
        /// <param name="categoryStatuses">List of all category statuses</param>
        /// <param name="monthExpenditureId">Current month expenditure</param>
        /// <returns></returns>
        [HttpPost("UpdateCategoryStatuses")]
        [Authorize]
        public ActionResult<DataResult> UpdateCategoryStatuses(List<CategoryStatusDto> categoryStatuses)
        {
            string userId = UserUtil.GetUserId(HttpContext);

            DataResult result = _categoriesBL.UpdateCategoryStatuses(userId, categoryStatuses);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }

        [HttpPost("UpdateCategoryExpenseBudgetLimits")]
        [Authorize]
        public ActionResult<DataResult> UpdateCategoryExpenseBudgetLimits(CategoryExpenseDto categoryExpense)
        {
            DataResult result = _categoriesBL.UpdateCategoryExpenseBudgetLimits(categoryExpense);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }
    }
}
