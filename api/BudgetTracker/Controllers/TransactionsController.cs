using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetTracker.BL.Interfaces;
using BudgetTracker.Controllers.Utils;
using BudgetTracker.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BudgetTracker.Controllers
{
    [Route("api/Transactions")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionsBL _transactionsBL;

        public TransactionsController(ITransactionsBL transactionsBL)
        {
            _transactionsBL = transactionsBL;
        }

        /// <summary>
        /// POST Request
        /// <para>Add new transaction to corresponding category expense</para>
        /// </summary>
        /// <param name="categoryExpenseId"></param>
        /// <param name="title"></param>
        /// <param name="date"></param>
        /// <param name="cost"></param>
        /// <returns>DataResult containing category expense with transactions</returns>
        [HttpPost("AddTransaction")]
        public ActionResult<DataResult> AddTransaction(int categoryExpenseId, string title, DateTime date, decimal cost)
        {
            DataResult result = _transactionsBL.AddTransaction(categoryExpenseId, title, date, cost);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }

        /// <summary>
        /// POST Request
        /// <para>Update existing transaction</para>
        /// </summary>
        /// <param name="transaction"></param>
        /// <returns>DataResult containing category expense with transactions</returns>
        [HttpPost("UpdateTransaction")]
        public ActionResult<DataResult> UpdateTransaction(TransactionDto transaction)
        {
            DataResult result = _transactionsBL.UpdateTransaction(transaction);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }

        /// <summary>
        /// POST Request
        /// <para>Delete transaction</para>
        /// </summary>
        /// <param name="transaction"></param>
        /// <returns>DataResult containing category expense with transactions</returns>
        [HttpPost("DeleteTransaction")]
        public ActionResult<DataResult> DeleteTransaction(TransactionDto transaction)
        {
            DataResult result = _transactionsBL.DeleteTransaction(transaction);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }
    }
}
