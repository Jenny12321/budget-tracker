using BudgetTracker.DAL.Interfaces;
using BudgetTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DAL
{
    public class MockMonthExpendituresDAL
    {
        List<MonthExpenditure> mockMonthExpenditures = new List<MonthExpenditure>
        {
            new MonthExpenditure() { MonthExpenditureId=1, EffectiveDate=new DateTime(2020, 1, 1), IsActive=false, UserId="1"},
            new MonthExpenditure() { MonthExpenditureId=2, EffectiveDate=new DateTime(2020, 2, 1), IsActive=false, UserId="1"},
            new MonthExpenditure() { MonthExpenditureId=3, EffectiveDate=new DateTime(2020, 3, 1), IsActive=false, UserId="1"},
            new MonthExpenditure() { MonthExpenditureId=4, EffectiveDate=new DateTime(2020, 4, 1), IsActive=true, UserId="1"},
            new MonthExpenditure() { MonthExpenditureId=5, EffectiveDate=new DateTime(2020, 1, 1), IsActive=false, UserId="2"},
            new MonthExpenditure() { MonthExpenditureId=6, EffectiveDate=new DateTime(2020, 2, 1), IsActive=false, UserId="2"},
            new MonthExpenditure() { MonthExpenditureId=7, EffectiveDate=new DateTime(2020, 3, 1), IsActive=false, UserId="2"},
            new MonthExpenditure() { MonthExpenditureId=8, EffectiveDate=new DateTime(2020, 4, 1), IsActive=true, UserId="2"}
        };

        public MonthExpenditure GetActiveMonthExpenditure(string user)
        {
            MonthExpenditure monthExpenditure = mockMonthExpenditures.Where(me => me.UserId == user && me.IsActive).First();

            return monthExpenditure;
        }

        public IEnumerable<MonthExpenditure> GetAllMonthExpenditures(string user)
        {
            IEnumerable<MonthExpenditure> monthExpenditures = mockMonthExpenditures.Where(me => me.UserId == user);

            return monthExpenditures;
        }

        public MonthExpenditure GetMonthExpenditureById(int id)
        {
            MonthExpenditure monthExpenditure = mockMonthExpenditures.FirstOrDefault(me => me.MonthExpenditureId == id);

            return monthExpenditure;
        }

        public IEnumerable<MonthExpenditure> GetMonthExpendituresByYear(string user, DateTime year)
        {
            IEnumerable<MonthExpenditure> monthExpenditures = mockMonthExpenditures.Where(me => me.UserId == user && me.EffectiveDate.Year == year.Year);

            return monthExpenditures;
        }
    }
}
