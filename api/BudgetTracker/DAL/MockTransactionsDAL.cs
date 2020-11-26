using BudgetTracker.DAL.Interfaces;
using BudgetTracker.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DAL
{
    public class MockTransactionsDAL
    {
        private List<Transaction> mockTransactions = new List<Transaction>
        {
            new Transaction() { TransactionId=1, CategoryExpenseId=1, MonthExpenditureId=1, Title="Transaction 1", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=2, CategoryExpenseId=2, MonthExpenditureId=1, Title="Transaction 2", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=3, CategoryExpenseId=3, MonthExpenditureId=1, Title="Transaction 3", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=4, CategoryExpenseId=4, MonthExpenditureId=1, Title="Transaction 4", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=5, CategoryExpenseId=5, MonthExpenditureId=1, Title="Transaction 5", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=6, CategoryExpenseId=6, MonthExpenditureId=1, Title="Transaction 6", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=7, CategoryExpenseId=7, MonthExpenditureId=1, Title="Transaction 7", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=8, CategoryExpenseId=1, MonthExpenditureId=1, Title="Transaction 8", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=9, CategoryExpenseId=2, MonthExpenditureId=1, Title="Transaction 9", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=10, CategoryExpenseId=3, MonthExpenditureId=1, Title="Transaction 10", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=11, CategoryExpenseId=4, MonthExpenditureId=1, Title="Transaction 11", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=12, CategoryExpenseId=5, MonthExpenditureId=1, Title="Transaction 12", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=13, CategoryExpenseId=6, MonthExpenditureId=1, Title="Transaction 13", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=14, CategoryExpenseId=7, MonthExpenditureId=1, Title="Transaction 14", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },

            new Transaction() { TransactionId=15, CategoryExpenseId=1, MonthExpenditureId=2, Title="Transaction 1", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=16, CategoryExpenseId=2, MonthExpenditureId=2, Title="Transaction 2", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=17, CategoryExpenseId=3, MonthExpenditureId=2, Title="Transaction 3", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=18, CategoryExpenseId=4, MonthExpenditureId=2, Title="Transaction 4", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=19, CategoryExpenseId=5, MonthExpenditureId=2, Title="Transaction 5", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=20, CategoryExpenseId=6, MonthExpenditureId=2, Title="Transaction 6", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=21, CategoryExpenseId=7, MonthExpenditureId=2, Title="Transaction 7", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=22, CategoryExpenseId=1, MonthExpenditureId=2, Title="Transaction 8", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=23, CategoryExpenseId=2, MonthExpenditureId=2, Title="Transaction 9", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=24, CategoryExpenseId=3, MonthExpenditureId=2, Title="Transaction 10", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=25, CategoryExpenseId=4, MonthExpenditureId=2, Title="Transaction 11", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=26, CategoryExpenseId=5, MonthExpenditureId=2, Title="Transaction 12", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=27, CategoryExpenseId=6, MonthExpenditureId=2, Title="Transaction 13", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=28, CategoryExpenseId=7, MonthExpenditureId=2, Title="Transaction 14", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },

            new Transaction() { TransactionId=29, CategoryExpenseId=1, MonthExpenditureId=3, Title="Transaction 1", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=30, CategoryExpenseId=2, MonthExpenditureId=3, Title="Transaction 2", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=31, CategoryExpenseId=3, MonthExpenditureId=3, Title="Transaction 3", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=32, CategoryExpenseId=4, MonthExpenditureId=3, Title="Transaction 4", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=33, CategoryExpenseId=5, MonthExpenditureId=3, Title="Transaction 5", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=34, CategoryExpenseId=6, MonthExpenditureId=3, Title="Transaction 6", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=35, CategoryExpenseId=7, MonthExpenditureId=3, Title="Transaction 7", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=12.34M },
            new Transaction() { TransactionId=36, CategoryExpenseId=1, MonthExpenditureId=3, Title="Transaction 8", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=37, CategoryExpenseId=2, MonthExpenditureId=3, Title="Transaction 9", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=38, CategoryExpenseId=3, MonthExpenditureId=3, Title="Transaction 10", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=39, CategoryExpenseId=4, MonthExpenditureId=3, Title="Transaction 11", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=40, CategoryExpenseId=5, MonthExpenditureId=3, Title="Transaction 12", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=41, CategoryExpenseId=6, MonthExpenditureId=3, Title="Transaction 13", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M },
            new Transaction() { TransactionId=42, CategoryExpenseId=7, MonthExpenditureId=3, Title="Transaction 14", Date=new DateTime(2020, 1, 1, 1, 1, 1), Cost=45.32M }
        };

        public IEnumerable<Transaction> GetAllTransactions()
        {
            return mockTransactions;
        }

        public Transaction GetTransactionById(int id)
        {
            Transaction transaction = mockTransactions.FirstOrDefault(t => t.TransactionId == id);

            return transaction;
        }

        public IEnumerable<Transaction> GetTransactionsByCategoryExpenseId(int categoryExpenseId)
        {
            IEnumerable<Transaction> transactionsByCategoryId = mockTransactions.Where(t => t.CategoryExpenseId == categoryExpenseId);

            return transactionsByCategoryId;
        }

        public IEnumerable<Transaction> GetTransactionsByMonthExpenditureId(int monthExpenditureId)
        {
            IEnumerable<Transaction> transactionsByMonthExpenditureId = mockTransactions.Where(t => t.MonthExpenditureId== monthExpenditureId);

            return transactionsByMonthExpenditureId;
        }
    }
}
