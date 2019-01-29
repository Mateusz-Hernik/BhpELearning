using AutoMapper;
using DTO.Requests;
using DTO.Responses;
using EntityLib.Entities;
using System;

namespace BhpApp.Profiles
{
    public class MessageProfile : Profile
    {
        public MessageProfile()
        {
            CreateMap<Message, MessageDto>()
                .ForMember(m => m.UserId, map => map.MapFrom(me => me.User.Id));

            CreateMap<SendMessageInfoDto, Message>()
                .BeforeMap((m, me) => me.IsRead = false)
                .BeforeMap((m, me) => me.Created = DateTime.Now)
                .BeforeMap((m, me) => me.Modified = DateTime.Now)
                .BeforeMap((m, me) => me.SendDate = DateTime.Now)
                .ForMember(m => m.Sender, map => map.MapFrom(me => me.SendFrom))
                .ForMember(m => m.Text, map => map.MapFrom(me => me.Message));
        }        
    }
}
