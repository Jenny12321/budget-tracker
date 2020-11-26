using BudgetTracker.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.BL.Interfaces
{
    public interface IMonthExpendituresBL
    {
        DataResult GetCurrentYearMonthExpenditures(string userId);
        MonthExpenditureDto GetMonthExpenditureById(int monthExpenditureId);
        DataResult GetMonthExpendituresByYear(string userId, int year);
        MonthExpenditureDto GetActiveMonthExpenditure(string userId);
        DataResult GetActiveYears(string userId);
    }
}
