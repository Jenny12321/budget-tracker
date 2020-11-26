using AutoMapper;
using BudgetTracker.BL.Interfaces;
using BudgetTracker.DAL.Interfaces;
using BudgetTracker.DTOs;
using BudgetTracker.Models;
using BudgetTracker.Models.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BudgetTracker.BL
{
    public class UsersBL : IUsersBL
    {
        private readonly IUsersDAL _usersDAL;
        private readonly IMonthExpendituresDAL _monthExpendituresDAL;
        private readonly ICategoriesDAL _categoriesDAL;
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IMapper _mapper;

        public UsersBL(IUsersDAL usersDAL, IMonthExpendituresDAL monthExpendituresDAL, ICategoriesDAL categoriesDAL, IConfiguration config, IHttpContextAccessor httpContext, IMapper mapper)
        {
            _usersDAL = usersDAL;
            _monthExpendituresDAL = monthExpendituresDAL;
            _categoriesDAL = categoriesDAL;
            _config = config;
            _httpContext = httpContext;
            _mapper = mapper;
        }

        public DataResult LoginUser(string userId)
        {
            List<string> validationMessages = new List<string>();
            bool success = false;
            UserDataDto userMapped = null;

            UserData user = _usersDAL.GetUserData(userId);

            if (user != null)
            {
                userMapped = _mapper.Map<UserDataDto>(user);

                var token = GenerateJSONWebToken(user.UserId);
                
                if (token != null)
                {
                    AddAuthenticationCookie(token);
                }

                if (userMapped != null)
                {
                    success = true;
                }
                else
                {
                    validationMessages.Add("User cannot be found. Please try again.");
                }
            }
            else
            {
                validationMessages.Add("User does not exist. Please register for a new account.");
            }

            return new DataResult(userMapped, success, validationMessages);
        }

        public DataResult CreateUser(string userId, string firstName, string lastName)
        {
            List<string> validationMessages = new List<string>();
            bool success = false;
            UserDataDto userMapped = null;

            UserData user = _usersDAL.CreateUserData(userId, firstName, lastName);

            if (user != null)
            {
                int year = DateTime.Now.Year;
                int month = DateTime.Now.Month;

                DateTime effectiveDate = new DateTime(year, month, 1);

                MonthExpenditure monthExpenditure = _monthExpendituresDAL.CreateMonthExpenditureByYearAndMonth(userId, effectiveDate);
                _categoriesDAL.CreateCategoryData(userId);

                var categories = Enum.GetValues(typeof(Category)).Cast<Category>();

                foreach (var category in categories)
                {
                    _categoriesDAL.CreateCategoryExpense(userId, category, monthExpenditure.MonthExpenditureId);
                }

                var token = GenerateJSONWebToken(user.UserId);

                if (token != null)
                {
                    AddAuthenticationCookie(token);
                }

                userMapped = _mapper.Map<UserDataDto>(user);

                if (userMapped != null)
                {
                    success = true;
                }
                else
                {
                    validationMessages.Add("User already exists.");
                }
            }
            else
            {
                validationMessages.Add("User already exists.");
            }

            return new DataResult(userMapped, success, validationMessages);
        }

        public DataResult LogoutUser()
        {
            bool success = false;

            DeleteAuthenticationCookie();

            success = true;

            return new DataResult(null, success);
        }

        private void DeleteAuthenticationCookie()
        {
            CookieOptions cookieOptions = new CookieOptions()
            {
                Secure = true,
                //Domain = "127.0.0.1:3000", // Remove in future
                //HttpOnly = true,
                IsEssential = true,
                SameSite = SameSiteMode.None
            };

            _httpContext.HttpContext.Response.Cookies.Delete("AuthenticationCookie", cookieOptions);
        }

        private void AddAuthenticationCookie(string token)
        {
            CookieOptions cookieOptions = new CookieOptions()
            {
                Secure = true,
                //Domain = "127.0.0.1:3000", // Remove in future
                //HttpOnly = true,
                IsEssential = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddMinutes(75)
            };

            _httpContext.HttpContext.Response.Cookies.Append("AuthenticationCookie", token, cookieOptions);
        }

        private string GenerateJSONWebToken(string userId)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            List<Claim> claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId)
            };

            JwtSecurityToken token = new JwtSecurityToken
            (
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials
            );

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return encodedToken;
        }
    }
}
