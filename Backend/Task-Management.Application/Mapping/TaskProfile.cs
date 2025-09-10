using AutoMapper;
using Task_Management.Application.Dtos;
using Task_Management.Domain.Models;

namespace Task_Management.Application.Mapping
{
    public class TaskProfile : Profile
    {
        public TaskProfile()
        {
            CreateMap<TaskItem, TaskDto>().ReverseMap();
            CreateMap<TaskItem, CreateTaskDto>().ReverseMap();
            CreateMap<TaskItem, UpdateTaskDto>().ReverseMap();
        }
    }
}
