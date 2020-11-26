using BudgetTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DAL.Interfaces
{
    public interface ITransactionsDAL
    {
        Transaction GetTransactionById(int transactionId);
        IEnumerable<Transaction> GetTransactionsByMonthExpenditureId(int monthExpenditureId);
        IEnumerable<Transaction> GetTransactionsByCategoryExpenseId(int categoryExpenseId);
        Transaction AddTransaction(int categoryExpenseId, int monthExpenditureId, string title, DateTime date, decimal cost);
        Transaction UpdateTransaction(int transactionId, string title, DateTime date, decimal cost);
        bool DeleteTransaction(int transactionId);
    }
}
