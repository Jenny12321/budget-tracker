using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.Models
{
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }

        [Required]
        public int CategoryExpenseId { get; set; }

        [Required]
        public int MonthExpenditureId { get; set; }

        [Required]
        [MaxLength(100)] // May need to change
        public string Title { get; set; }

        [Required]
        public DateTime Date { get; set; } // Stored as a UTC value

        [Required]
        public decimal Cost { get; set; }

        [Required]
        public DateTime LastModifiedTimeStamp { get; set; }
    }
}
