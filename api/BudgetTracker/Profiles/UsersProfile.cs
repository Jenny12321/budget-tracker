using AutoMapper;
using BudgetTracker.DTOs;
using BudgetTracker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetTracker.Profiles
{
    public class UsersProfile : Profile
    {
        public UsersProfile()
        {
            CreateMap<UserData, UserDataDto>();
            CreateMap<UserDataDto, UserData>();
        }
    }
}
