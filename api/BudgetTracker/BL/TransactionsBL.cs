using AutoMapper;
using BudgetTracker.BL.Interfaces;
using BudgetTracker.DAL.Interfaces;
using BudgetTracker.DTOs;
using BudgetTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace BudgetTracker.BL
{
    public class TransactionsBL : ITransactionsBL
    {
        private readonly ITransactionsDAL _transactionsDAL;
        private readonly ICategoriesDAL _categoriesDAL;
        private readonly IMapper _mapper;

        public TransactionsBL(ITransactionsDAL transactionsDAL, ICategoriesDAL categoriesDAL, IMapper mapper)
        {
            _transactionsDAL = transactionsDAL;
            _categoriesDAL = categoriesDAL;
            _mapper = mapper;
        }

        public DataResult AddTransaction(int categoryExpenseId, string title, DateTime date, decimal cost)
        {
            List<string> validationMessages = new List<string>();
            bool success = false;
            CategoryExpenseDto mappedCategoryExpense = null;

            CategoryExpense categoryExpense = _categoriesDAL.GetCategoryExpenseById(categoryExpenseId);

            if (categoryExpense != null)
            {
                Transaction transaction = _transactionsDAL.AddTransaction(categoryExpenseId, categoryExpense.MonthExpenditureId, title, date, cost);

                if (transaction != null)
                {
                    decimal amountSpent = categoryExpense.AmountSpent + transaction.Cost;
                    decimal amountLeft = categoryExpense.UpperBudgetAmount - amountSpent;

                    if (amountLeft < 0)
                    {
                        amountLeft = decimal.Zero;
                    }

                    categoryExpense = _categoriesDAL.UpdateCategoryExpenseAmountSpentAndAmountLeft(categoryExpense.CategoryExpenseId, amountSpent, amountLeft);

                    if (categoryExpense != null)
                    {
                        List<Transaction> transactions = _transactionsDAL.GetTransactionsByCategoryExpenseId(categoryExpense.CategoryExpenseId).OrderByDescending(t => t.Date).ToList();
                        categoryExpense.Transactions = transactions;

                        mappedCategoryExpense = _mapper.Map<CategoryExpenseDto>(categoryExpense);

                        if (mappedCategoryExpense != null)
                        {
                            success = true;
                        }
                    }
                }
            }

            if (!success)
            {
                validationMessages.Add("Could not save new transaction. Please refresh page and try again.");
            }

            return new DataResult(mappedCategoryExpense, success, validationMessages);
        }

        public DataResult UpdateTransaction(TransactionDto transactionDto)
        {
            List<string> validationMessages = new List<string>();
            bool success = false;
            CategoryExpenseDto mappedCategoryExpense = null;

            Transaction oldTransaction = _transactionsDAL.GetTransactionById(transactionDto.TransactionId);
            decimal oldTransactionCost = oldTransaction.Cost;

            Transaction newTransaction = _transactionsDAL.UpdateTransaction(transactionDto.TransactionId, transactionDto.Title, transactionDto.Date, transactionDto.Cost);

            if (newTransaction != null)
            {
                CategoryExpense categoryExpense = _categoriesDAL.GetCategoryExpenseById(newTransaction.CategoryExpenseId);

                decimal amountSpent = ( categoryExpense.AmountSpent - oldTransactionCost ) + newTransaction.Cost;
                decimal amountLeft = categoryExpense.UpperBudgetAmount - amountSpent;

                if (amountLeft < 0)
                {
                    amountLeft = decimal.Zero;
                }

                categoryExpense = _categoriesDAL.UpdateCategoryExpenseAmountSpentAndAmountLeft(categoryExpense.CategoryExpenseId, amountSpent, amountLeft);

                if (categoryExpense != null)
                {
                    List<Transaction> transactions = _transactionsDAL.GetTransactionsByCategoryExpenseId(categoryExpense.CategoryExpenseId).OrderByDescending(t => t.Date).ToList();
                    categoryExpense.Transactions = transactions;

                    mappedCategoryExpense = _mapper.Map<CategoryExpenseDto>(categoryExpense);

                    if (mappedCategoryExpense != null)
                    {
                        success = true;
                    }
                }
            }

            if (!success)
            {
                validationMessages.Add("Could not update transaction. Please refresh page and try again.");
            }

            return new DataResult(mappedCategoryExpense, success, validationMessages);
        }

        public DataResult DeleteTransaction(TransactionDto transactionDto)
        {
            List<string> validationMessages = new List<string>();
            bool success = false;
            CategoryExpenseDto mappedCategoryExpense = null;

            Transaction transaction = _transactionsDAL.GetTransactionById(transactionDto.TransactionId);
            bool isTransactionDeleted = _transactionsDAL.DeleteTransaction(transactionDto.TransactionId);

            if (isTransactionDeleted)
            {
                CategoryExpense categoryExpense = _categoriesDAL.GetCategoryExpenseById(transaction.CategoryExpenseId);

                decimal amountSpent = categoryExpense.AmountSpent - transaction.Cost;
                decimal amountLeft = categoryExpense.UpperBudgetAmount - amountSpent;

                categoryExpense = _categoriesDAL.UpdateCategoryExpenseAmountSpentAndAmountLeft(categoryExpense.CategoryExpenseId, amountSpent, amountLeft);

                if (categoryExpense != null)
                {
                    List<Transaction> transactions = _transactionsDAL.GetTransactionsByCategoryExpenseId(categoryExpense.CategoryExpenseId).OrderByDescending(t => t.Date).ToList();
                    categoryExpense.Transactions = transactions;

                    mappedCategoryExpense = _mapper.Map<CategoryExpenseDto>(categoryExpense);

                    if (mappedCategoryExpense != null)
                    {
                        success = true;
                    }
                }
            }

            if (!success)
            {
                validationMessages.Add("Could not delete transaction. Please refresh page and try again.");
            }

            return new DataResult(mappedCategoryExpense, success, validationMessages);
        }
    }
}
