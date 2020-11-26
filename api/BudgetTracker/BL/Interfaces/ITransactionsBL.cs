using BudgetTracker.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.BL.Interfaces
{
    public interface ITransactionsBL
    {
        DataResult AddTransaction(int categoryExpenseId, string title, DateTime date, decimal cost);
        DataResult UpdateTransaction(TransactionDto transactionDto);
        DataResult DeleteTransaction(TransactionDto transactionDto);
    }
}
