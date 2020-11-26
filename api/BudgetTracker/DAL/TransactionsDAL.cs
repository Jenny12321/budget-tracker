using BudgetTracker.DAL.DbContexts;
using BudgetTracker.DAL.Interfaces;
using BudgetTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;

namespace BudgetTracker.DAL
{
    public class TransactionsDAL : ITransactionsDAL
    {
        private readonly BudgetTrackerContext _context;

        public TransactionsDAL(BudgetTrackerContext context)
        {
            _context = context;
        }

        public Transaction GetTransactionById(int id)
        {
            Transaction transaction = _context.Transactions.FirstOrDefault(t => t.TransactionId == id);
            SetTransactionDateKindToUtc(transaction);

            return transaction;
        }

        public IEnumerable<Transaction> GetTransactionsByCategoryExpenseId(int categoryExpenseId)
        {
            IEnumerable<Transaction> transactionsByCategoryId = _context.Transactions.Where(t => t.CategoryExpenseId == categoryExpenseId);
            SetTransactionsDateKindToUtc(transactionsByCategoryId);

            return transactionsByCategoryId;
        }

        public IEnumerable<Transaction> GetTransactionsByMonthExpenditureId(int monthExpenditureId)
        {
            IEnumerable<Transaction> transactionsByMonthExpenditureId = _context.Transactions.Where(t => t.MonthExpenditureId == monthExpenditureId);
            SetTransactionsDateKindToUtc(transactionsByMonthExpenditureId);

            return transactionsByMonthExpenditureId;
        }

        public Transaction AddTransaction(int categoryExpenseId, int monthExpenditureId, string title, DateTime date, decimal cost)
        {
            DateTime utcDate = date;

            if (date.Kind != DateTimeKind.Utc)
            {
                utcDate = date.ToUniversalTime();
            }

            Transaction transaction = new Transaction()
            {
                CategoryExpenseId = categoryExpenseId,
                MonthExpenditureId = monthExpenditureId,
                Title = title,
                Date = utcDate,
                Cost = cost,
                LastModifiedTimeStamp = DateTime.Now
            };

            _context.Transactions.Add(transaction);
            _context.SaveChanges();

            return transaction;
        }

        public Transaction UpdateTransaction(int transactionId, string title, DateTime date, decimal cost)
        {
            Transaction transaction = _context.Transactions.FirstOrDefault(t => t.TransactionId == transactionId);
            DateTime utcDate = date;

            if (transaction != null)
            {
                if (date.Kind != DateTimeKind.Utc)
                {
                    utcDate = date.ToUniversalTime();
                }

                transaction.Title = title;
                transaction.Date = utcDate;
                transaction.Cost = cost;
                transaction.LastModifiedTimeStamp = DateTime.Now;

                _context.Transactions.Update(transaction);
                _context.SaveChanges();

                return transaction;
            }

            return null;
        }

        public bool DeleteTransaction(int transactionId)
        {
            Transaction transaction = _context.Transactions.FirstOrDefault(t => t.TransactionId == transactionId);

            if (transaction != null)
            {
                _context.Transactions.Remove(transaction);
                _context.SaveChanges();

                return true;
            }

            return false;
        }

        private void SetTransactionsDateKindToUtc(IEnumerable<Transaction> transactions)
        {
            foreach (Transaction transaction in transactions)
            {
                SetTransactionDateKindToUtc(transaction);
            }
        }

        private void SetTransactionDateKindToUtc(Transaction transaction)
        {
            // Date values are transformed to UTC before being stored in database, but the DateTimeKind is set to Unspecified when fetched from database
            // Therefore, specify the kind to UTC
            if (transaction.Date.Kind != DateTimeKind.Utc)
            {
                transaction.Date = DateTime.SpecifyKind(transaction.Date, DateTimeKind.Utc);
            }
        }
    }
}
