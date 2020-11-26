using BudgetTracker.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.Models
{
    public class CategoryExpense
    {
        [Key]
        public int CategoryExpenseId { get; set; }

        [Required]
        public Category CategoryTypeId { get; set; }

        [Required]
        public int MonthExpenditureId { get; set; }

        [Required]
        public DateTime EffectiveStart { get; set; }

        [Required]
        public DateTime EffectiveEnd { get; set; }

        [Required]
        public decimal AmountSpent { get; set; }

        [Required]
        public decimal AmountLeft { get; set; }

        [Required]
        public decimal LowerBudgetAmount { get; set; }
        
        [Required]
        public decimal UpperBudgetAmount { get; set; }

        [NotMapped]
        public List<Transaction> Transactions { get; set; }

        [Required]
        public DateTime LastModifiedTimeStamp { get; set; }
    }
}
