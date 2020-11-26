using BudgetTracker.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DTOs
{
    public class CategoryStatusDto
    {
        public string CategoryName { get; set; }
        public Category CategoryTypeId { get; set; }
        public bool IsActive { get; set; }
        public State State { get; set; }
    }
}
