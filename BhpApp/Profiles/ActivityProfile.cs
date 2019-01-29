using AutoMapper;
using DTO.Responses;
using EntityLib.Entities;

namespace BhpApp.Profiles
{
    public class ActivityProfile : Profile
    {
        public ActivityProfile()
        {
            CreateMap<Activity, ActivityDescriptionDto>()
                .BeforeMap((a, ad) => ad.IsCompleted = false)
                .BeforeMap((a, ad) => ad.IsAvaiable = false);
        }
    }
}
