using BudgetTracker.DAL.DbContexts;
using BudgetTracker.DAL.Interfaces;
using BudgetTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DAL
{
    public class MonthExpendituresDAL : IMonthExpendituresDAL
    {
        private readonly BudgetTrackerContext _context;

        public MonthExpendituresDAL(BudgetTrackerContext context)
        {
            _context = context;
        }

        public IEnumerable<MonthExpenditure> GetAllMonthExpenditures(string userId)
        {
            IEnumerable<MonthExpenditure> monthExpenditures = _context.MonthExpenditures.Where(me => me.UserId == userId);

            return monthExpenditures;
        }

        public MonthExpenditure GetMonthExpenditureById(int monthExpenditureId)
        {
            MonthExpenditure monthExpenditure = _context.MonthExpenditures.FirstOrDefault(me => me.MonthExpenditureId == monthExpenditureId);

            return monthExpenditure;
        }

        public IEnumerable<MonthExpenditure> GetMonthExpendituresByYear(string userId, DateTime year)
        {
            IEnumerable<MonthExpenditure> monthExpenditures = _context.MonthExpenditures.Where(me => me.UserId == userId && me.EffectiveDate.Year == year.Year);

            return monthExpenditures;
        }

        public MonthExpenditure GetActiveMonthExpenditure(string userId)
        {
            MonthExpenditure monthExpenditure = _context.MonthExpenditures.Where(me => me.UserId == userId && me.IsActive).First();

            return monthExpenditure;
        }

        public MonthExpenditure CreateMonthExpenditureByYearAndMonth(string userId, DateTime effectiveDate)
        {
            MonthExpenditure monthExpenditure = new MonthExpenditure()
            {
                UserId = userId,
                EffectiveDate = effectiveDate,
                IsActive = true,
                CategoryExpenses = new List<CategoryExpense>(),
                LastModifiedTimeStamp = DateTime.Now
            };

            _context.MonthExpenditures.Add(monthExpenditure);
            _context.SaveChanges();
            
            return monthExpenditure;
        }

        public MonthExpenditure UpdateMonthExpenditureActiveStateById(int monthExpenditureId, bool activeState)
        {
            MonthExpenditure monthExpenditure = _context.MonthExpenditures.FirstOrDefault(me => me.MonthExpenditureId == monthExpenditureId);

            if (monthExpenditure != null)
            {
                monthExpenditure.LastModifiedTimeStamp = DateTime.Now;
                monthExpenditure.IsActive = activeState;
                _context.MonthExpenditures.Update(monthExpenditure);
                _context.SaveChanges();
            }

            return monthExpenditure;
        }
    }
}
