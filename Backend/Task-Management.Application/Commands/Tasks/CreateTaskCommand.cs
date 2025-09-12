using AutoMapper;
using MediatR;
using Task_Management.Application.Dtos;
using Task_Management.Application.Interfaces;
using Task_Management.Domain.Models;

namespace Task_Management.Application.Commands.Tasks
{
    public record CreateTaskCommand(CreateTaskDto TaskDto, int UserId) : IRequest<TaskDto>;

    public class CreateTaskCommmandHandler : IRequestHandler<CreateTaskCommand, TaskDto>
    {
        private readonly ITaskRepository _repository;
        private readonly IMapper _mapper;
        public CreateTaskCommmandHandler(ITaskRepository reporsitory, IMapper mapper)
        {
            _repository = reporsitory;
            _mapper = mapper;
        }

        public async Task<TaskDto> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
        {
            var task = _mapper.Map<TaskItem>(request.TaskDto);
            task.CreatedBy = request.UserId;
            task.CreatedAt = DateTime.UtcNow;

            await _repository.CreateAsync(task);

            return _mapper.Map<TaskDto>(task);

        }
    }
}
