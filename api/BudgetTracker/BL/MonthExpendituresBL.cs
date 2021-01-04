using AutoMapper;
using BudgetTracker.BL.Interfaces;
using BudgetTracker.DAL.Interfaces;
using BudgetTracker.DTOs;
using BudgetTracker.Models;
using BudgetTracker.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.BL
{
    public class MonthExpendituresBL : IMonthExpendituresBL
    {
        private readonly IMonthExpendituresDAL _monthExpenditureDAL;
        private readonly ICategoriesDAL _categoryExpensesDAL;
        private readonly ITransactionsDAL _transactionsDAL;
        private readonly IUsersDAL _userDAL;
        private readonly IMapper _mapper;

        public MonthExpendituresBL(IMonthExpendituresDAL monthExpendituresDAL, ICategoriesDAL categoryExpensesDAL, ITransactionsDAL transactionsDAL, IUsersDAL userDAL, IMapper mapper)
        {
            _monthExpenditureDAL = monthExpendituresDAL;
            _categoryExpensesDAL = categoryExpensesDAL;
            _transactionsDAL = transactionsDAL;
            _userDAL = userDAL;
            _mapper = mapper;
        }

        public MonthExpenditureDto GetActiveMonthExpenditure(string userId)
        {
            MonthExpenditure monthExpenditure = _monthExpenditureDAL.GetActiveMonthExpenditure(userId);

            if (monthExpenditure != null)
            {
                MapTransactionsAndCategoryExpensesToMonthExpenditure(monthExpenditure);
                MonthExpenditureDto mappedMonthExpenditure = _mapper.Map<MonthExpenditureDto>(monthExpenditure);

                return mappedMonthExpenditure;
            }

            return null;
        }

        public DataResult GetCurrentYearMonthExpenditures(string userId)
        {
            List<string> validationMessages = new List<string>();
            bool success = false;
            IEnumerable<MonthExpenditureDto> mappedMonthExpenditures = null;

            MonthExpenditure activeMonthExpenditure = _monthExpenditureDAL.GetActiveMonthExpenditure(userId);

            if (activeMonthExpenditure.EffectiveDate.Month != DateTime.Now.Month)
            {
                UpdateMonthExpenditureActiveState(activeMonthExpenditure, false);
                CreateMonthExpenditure(userId, DateTime.Now.Year, DateTime.Now.Month);
            }

            List<MonthExpenditure> monthExpenditures = _monthExpenditureDAL.GetAllMonthExpenditures(userId).Where(e => e.EffectiveDate.Year == DateTime.Now.Year).ToList();
            
            // Only grab and map transactions and category expenses for current year of month expenditures
            foreach (var monthExpenditure in monthExpenditures)
            {
                MapTransactionsAndCategoryExpensesToMonthExpenditure(monthExpenditure);
            }

            mappedMonthExpenditures = _mapper.Map<IEnumerable<MonthExpenditureDto>>(monthExpenditures);

            if (mappedMonthExpenditures != null)
            {
                success = true;
            }
            else
            {
                validationMessages.Add("Cannot get expenses. Please refresh the page.");
            }

            return new DataResult(mappedMonthExpenditures, success, validationMessages);
        }

        public MonthExpenditureDto GetMonthExpenditureById(int monthExpenditureId)
        {
            MonthExpenditure monthExpenditure = _monthExpenditureDAL.GetMonthExpenditureById(monthExpenditureId);

            if (monthExpenditure != null)
            {
                MapTransactionsAndCategoryExpensesToMonthExpenditure(monthExpenditure);
                MonthExpenditureDto mappedMonthExpenditure = _mapper.Map<MonthExpenditureDto>(monthExpenditure);

                return mappedMonthExpenditure;
            }

            return null;
        }

        public DataResult GetMonthExpendituresByYear(string userId, int year)
        {
            List<string> validationMessages = new List<string>();
            bool success = false;
            IEnumerable<MonthExpenditureDto> mappedMonthExpenditures = null;

            List<MonthExpenditure> monthExpenditures = _monthExpenditureDAL.GetAllMonthExpenditures(userId).Where(e => e.EffectiveDate.Year == year).ToList();

            foreach (var monthExpenditure in monthExpenditures)
            {
                MapTransactionsAndCategoryExpensesToMonthExpenditure(monthExpenditure);
            }

            mappedMonthExpenditures = _mapper.Map<IEnumerable<MonthExpenditureDto>>(monthExpenditures);

            if (mappedMonthExpenditures != null)
            {
                success = true;
            }
            else
            {
                validationMessages.Add("Cannot get expenses. Please refresh the page.");
            }

            return new DataResult(mappedMonthExpenditures, success, validationMessages);
        }

        private void MapTransactionsAndCategoryExpensesToMonthExpenditure(MonthExpenditure monthExpenditure)
        {
            List<CategoryExpense> categoryExpenses = _categoryExpensesDAL.GetCategoryExpensesByMonthExpenditureId(monthExpenditure.MonthExpenditureId).OrderBy(ce => ce.CategoryTypeId).ToList();
            List<Transaction> transactions = _transactionsDAL.GetTransactionsByMonthExpenditureId(monthExpenditure.MonthExpenditureId).ToList();

            foreach (var categoryExpense in categoryExpenses)
            {
                List<Transaction> categoryTransactions = transactions.Where(t => t.CategoryExpenseId == categoryExpense.CategoryExpenseId).OrderByDescending(t => t.Date).ToList();
                categoryExpense.Transactions = categoryTransactions;
            }

            monthExpenditure.CategoryExpenses = categoryExpenses;
        }

        private void UpdateMonthExpenditureActiveState(MonthExpenditure monthExpenditure, bool activeState)
        {
            if (monthExpenditure != null)
            {
                MonthExpenditure updatedMonthExpenditure = _monthExpenditureDAL.UpdateMonthExpenditureActiveStateById(monthExpenditure.MonthExpenditureId, activeState);
                monthExpenditure.IsActive = updatedMonthExpenditure.IsActive;
            }
        }

        private MonthExpenditure CreateMonthExpenditure(string userId, int year, int month)
        {
            DateTime effectiveDate = new DateTime(year, month, 1);
            MonthExpenditure newMonthExpenditure = _monthExpenditureDAL.CreateMonthExpenditureByYearAndMonth(userId, effectiveDate);

            var categories = Enum.GetValues(typeof(Category)).Cast<Category>();

            foreach (var category in categories)
            {
                _categoryExpensesDAL.CreateCategoryExpense(userId, category, newMonthExpenditure.MonthExpenditureId);
            }

            return newMonthExpenditure;
        }

        public DataResult GetActiveYears(string userId)
        {
            List<string> validationMessages = new List<string>();
            bool success = false;
            List<int> activeYears = new List<int>();

            UserData user = _userDAL.GetUserData(userId);

            if (user != null)
            {
                int createdYear = user.CreatedDate.Year;
                int currentYear = DateTime.Now.Year;

                int count = currentYear - createdYear + 1;

                activeYears = Enumerable.Range(createdYear, count).ToList();

                if (activeYears != null && activeYears.Any())
                {
                    success = true;
                }
            }

            if (!success)
            {
                validationMessages.Add("Could not fetch active years. Please refresh page and try again.");
            }

            return new DataResult(activeYears, success, validationMessages);
        }
    }
}
