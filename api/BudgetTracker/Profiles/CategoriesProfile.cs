using AutoMapper;
using BudgetTracker.DTOs;
using BudgetTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.Profiles
{
    public class CategoriesProfile : Profile
    {
        public CategoriesProfile()
        {
            CreateMap<CategoryExpense, CategoryExpenseDto>();
            CreateMap<CategoryExpenseDto, CategoryExpense>();
            CreateMap<CategoryData, CategoryDataDto>();
            CreateMap<CategoryDataDto, CategoryData>();
        }
    }
}
