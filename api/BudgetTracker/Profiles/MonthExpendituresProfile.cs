using AutoMapper;
using BudgetTracker.DTOs;
using BudgetTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.Profiles
{
    public class MonthExpendituresProfile : Profile
    {
        public MonthExpendituresProfile()
        {
            CreateMap<MonthExpenditure, MonthExpenditureDto>();
            CreateMap<MonthExpenditureDto, MonthExpenditure>();
        }
    }
}
