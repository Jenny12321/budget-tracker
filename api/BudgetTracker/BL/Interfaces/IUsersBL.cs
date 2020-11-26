using BudgetTracker.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.BL.Interfaces
{
    public interface IUsersBL
    {
        public DataResult LoginUser(string userId);
        public DataResult CreateUser(string userId, string firstName, string lastName);
        public DataResult LogoutUser();
    }
}
