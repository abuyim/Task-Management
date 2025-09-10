using AutoMapper;
using Task_Management.Application.Dtos;
using Task_Management.Domain.Models;

namespace Task_Management.Application.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, CreateUserDto>().ReverseMap();
            CreateMap<User, UpdateUserDto>().ReverseMap();

        }
    }
}
