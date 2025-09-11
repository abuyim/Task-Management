using AutoMapper;
using MediatR;
using Task_Management.Application.Dtos;
using Task_Management.Application.Interfaces;

namespace Task_Management.Application.Commands.Tasks
{
    public record UpdateTaskCommand(UpdateTaskDto UpdateTaskDto, int Id, int UserId) : IRequest<TaskDto>;

    public class UpdateTaskCommandHandler : IRequestHandler<UpdateTaskCommand, TaskDto>
    {
        private readonly ITaskRepository _repository;
        private readonly IMapper _mapper;

        public UpdateTaskCommandHandler(IMapper mapper, ITaskRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<TaskDto> Handle(UpdateTaskCommand request, CancellationToken cancellationToken)
        {
            var task = await _repository.GetByIdAsync(request.Id);
            if (task == null)
            {
                throw new KeyNotFoundException($"Task with Id {request.Id} not found");
            }
            _mapper.Map(request.UpdateTaskDto, task);
            task.UpdatedAt = DateTime.UtcNow;
            task.ModifiedBy = request.UserId;
            await _repository.UpdateAsync(task);

            return _mapper.Map<TaskDto>(task);

        }
    }
}
