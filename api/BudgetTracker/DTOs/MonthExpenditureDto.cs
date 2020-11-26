using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DTOs
{
    public class MonthExpenditureDto
    {
        public int MonthExpenditureId { get; set; }
        public DateTime EffectiveDate { get; set; }
        public bool IsActive { get; set; }
        public List<CategoryExpenseDto> CategoryExpenses { get; set; }
    }
}
