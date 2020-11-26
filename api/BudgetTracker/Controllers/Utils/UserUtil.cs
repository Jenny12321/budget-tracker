using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BudgetTracker.Controllers.Utils
{
    public class UserUtil
    {
        public static string GetUserId(HttpContext httpContext)
        {
            ClaimsIdentity identity = httpContext.User.Identity as ClaimsIdentity;
            List<Claim> claims = identity.Claims.ToList();

            string userId = claims[0].Value;

            return userId;
        }
    }
}
