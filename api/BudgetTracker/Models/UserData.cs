using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.Models
{
    public class UserData
    {
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }
        
        public string LastName { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedTimeStamp { get; set; }
    }
}
