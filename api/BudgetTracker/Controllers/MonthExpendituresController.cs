using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BudgetTracker.BL.Interfaces;
using BudgetTracker.Controllers.Utils;
using BudgetTracker.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetTracker.Controllers
{
    [Route("api/MonthExpenditures")]
    [ApiController]
    public class MonthExpendituresController : ControllerBase
    {
        #region Ctor
        private readonly IMonthExpendituresBL _monthExpendituresBL;

        public MonthExpendituresController(IMonthExpendituresBL monthExpendituresBL)
        {
            _monthExpendituresBL = monthExpendituresBL;
        }
        #endregion

        /// <summary>
        /// GET Request
        /// <para>Get current year month expenditures</para>
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetMonthExpenditures")]
        [Authorize]
        public ActionResult<DataResult> GetMonthExpenditures()
        {
            string userId = UserUtil.GetUserId(HttpContext);

            DataResult result = _monthExpendituresBL.GetCurrentYearMonthExpenditures(userId);

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
        /// POST Request
        /// <para>Get month expenditures by year</para>
        /// </summary>
        /// <param name="date">Year housed in a date string</param>
        /// <returns></returns>
        [HttpPost("GetMonthExpendituresByYear")]
        [Authorize]
        public ActionResult<DataResult> GetMonthExpendituresByYear(int year)
        {
            string userId = UserUtil.GetUserId(HttpContext);

            DataResult result = _monthExpendituresBL.GetMonthExpendituresByYear(userId, year);

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
        /// GET Request
        /// <para>Get all active years user has been in database</para>
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetActiveYears")]
        [Authorize]
        public ActionResult<DataResult> GetActiveYears()
        {
            string userId = UserUtil.GetUserId(HttpContext);

            DataResult result = _monthExpendituresBL.GetActiveYears(userId);

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
