using AutoMapper;
using DTO;
using EntityLib.Entities;

namespace BhpApp.Profiles
{
    public class MessageProfile : Profile
    {
        public MessageProfile()
        {
            CreateMap<Message, MessageDto>()
                .ForMember(m => m.UserId, map => map.MapFrom(me => me.User.Id));
        }        
    }
}
