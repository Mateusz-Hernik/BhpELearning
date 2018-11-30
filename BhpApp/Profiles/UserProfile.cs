using AutoMapper;
using BhpApp.Models.AccountViewModels;
using EntityLib.Entities;

namespace BhpApp.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<RegisterViewModel, User>()
                .ForMember(u => u.UserName, map => map.MapFrom(up => up.Email));
        }
    }
}
