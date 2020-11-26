using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DTOs
{
    public class CategoryDataDto
    {
        public List<CategoryExpenseDto> CategoryExpenses { get; set; }
        
        public List<CategoryStatusDto> CategoryStatuses { get; set; }
    }
}
