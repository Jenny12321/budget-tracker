using BudgetTracker.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DTOs
{
    public class CategoryExpenseDto
    {
        public int CategoryExpenseId { get; set; }
        public Category CategoryTypeId { get; set; }
        public decimal AmountSpent { get; set; }
        public decimal AmountLeft { get; set; }
        public decimal LowerBudgetAmount { get; set; }
        public decimal UpperBudgetAmount { get; set; }
        public DateTime EffectiveStart { get; set; }
        public DateTime EffectiveEnd { get; set; }
        public List<TransactionDto> Transactions { get; set; }
    }
}
