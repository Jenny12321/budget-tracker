using BudgetTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DAL.Interfaces
{
    public interface IUsersDAL
    {
        public UserData GetUserData(string userId);
        public UserData CreateUserData(string userId, string firstName = null, string lastName = null);
    }
}
