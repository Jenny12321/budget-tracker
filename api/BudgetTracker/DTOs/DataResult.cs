using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DTOs
{
    public class DataResult
    {
        public object Result { get; set; }
        public bool Success { get; set; }
        public List<string> ValidationMessages { get; set; } 

        public DataResult()
        {
            Result = null;
            Success = false;
            ValidationMessages = new List<string>();
        }

        public DataResult(object result, bool success)
        {
            Result = result;
            Success = success;
            ValidationMessages = new List<string>();
        }

        public DataResult(object result, bool success, List<string> validationMessages = null)
        {
            Result = result;
            Success = success;
            ValidationMessages = validationMessages ?? new List<string>();
        }
    }
}
