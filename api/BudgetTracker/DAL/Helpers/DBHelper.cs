using BudgetTracker.DAL.DbContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.DAL.Helpers
{
    public class DBHelper
    {
        private readonly BudgetTrackerContext _context;

        public DBHelper(BudgetTrackerContext context)
        {
            _context = context;
        }

        public void SaveChanges()
        {
            try
            {
                _context.SaveChanges();
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}
