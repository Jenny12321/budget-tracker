using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetTracker.BL.Interfaces;
using BudgetTracker.Controllers.Utils;
using BudgetTracker.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BudgetTracker.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    //[EnableCors("AllowOrigin")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUsersBL _usersBL;
        private readonly IMonthExpendituresBL _monthExpendituresBL;

        public AuthenticationController(IUsersBL usersBL, IMonthExpendituresBL monthExpendituresBL)
        {
            _usersBL = usersBL;
            _monthExpendituresBL = monthExpendituresBL;
        }

        [HttpPost("LoginUser")]
        public ActionResult<DataResult> LoginUser(string userId)
        {
            DataResult result = _usersBL.LoginUser(userId);
            
            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }

        [HttpPost("CreateUser")]
        public ActionResult<DataResult> CreateUser(string userId, string firstName, string lastName)
        {
            DataResult result = _usersBL.CreateUser(userId, firstName, lastName);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }

        [HttpPost("LogoutUser")]
        [Authorize]
        public ActionResult<DataResult> LogoutUser()
        {
            DataResult result = _usersBL.LogoutUser();

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
