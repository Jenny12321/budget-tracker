using BudgetTracker.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.Models
{
    public class MonthExpenditure
    {
        [Key]
        public int MonthExpenditureId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public DateTime EffectiveDate { get; set; } // Stores the year and month that the MonthExpenditure is for

        [Required]
        public bool IsActive { get; set; }

        [NotMapped]
        public List<CategoryExpense> CategoryExpenses { get; set; }

        [Required]
        public DateTime LastModifiedTimeStamp { get; set; }
    }
}
