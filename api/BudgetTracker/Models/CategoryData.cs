using BudgetTracker.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.Models
{
    // Determines which categories are enabled and disabled
    public class CategoryData
    {
        [Key]
        public int CategoryDataId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public bool Food { get; set; }

        [Required]
        public bool Transportation { get; set; }

        [Required]
        public bool Grocery { get; set; }

        [Required]
        public bool Health { get; set; }

        [Required]
        public bool Entertainment { get; set; }

        [Required]
        public bool Bill { get; set; }

        [Required]
        public bool Other { get; set; }

        [Required]
        public DateTime LastModifiedTimeStamp { get; set; }
    }
}
