using BudgetTracker.DAL.DbContexts;
using BudgetTracker.DAL.Interfaces;
using BudgetTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DAL
{
    public class UsersDAL : IUsersDAL
    {
        private readonly BudgetTrackerContext _context;

        public UsersDAL(BudgetTrackerContext context)
        {
            _context = context;
        }

        public UserData GetUserData(string userId)
        {
            UserData user = _context.Users.FirstOrDefault(user => user.UserId == userId);

            return user;
        }

        public UserData CreateUserData(string userId, string firstName = null, string lastName = null)
        {
            UserData user = new UserData()
            {
                FirstName = firstName,
                LastName = lastName,
                UserId = userId,
                CreatedDate = DateTime.Now,
                LastModifiedTimeStamp = DateTime.Now
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }
    }
}
