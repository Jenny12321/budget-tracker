using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DTOs
{
    public class TransactionDto
    {
        public int TransactionId { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public decimal Cost { get; set; }
    }
}
