using BudgetTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DAL.Interfaces
{
    public interface IMonthExpendituresDAL
    {
        IEnumerable<MonthExpenditure> GetAllMonthExpenditures(string userId);
        MonthExpenditure GetMonthExpenditureById(int monthExpenditureId);
        IEnumerable<MonthExpenditure> GetMonthExpendituresByYear(string userId, DateTime year);
        MonthExpenditure GetActiveMonthExpenditure(string userId);
        MonthExpenditure CreateMonthExpenditureByYearAndMonth(string userId, DateTime effectiveDate);
        MonthExpenditure UpdateMonthExpenditureActiveStateById(int monthExpenditureId, bool activeState);
    }
}
