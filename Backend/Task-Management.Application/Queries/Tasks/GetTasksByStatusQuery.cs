using AutoMapper;
using MediatR;
using Task_Management.Application.Dtos;
using Task_Management.Application.Interfaces;
using Task_Management.Domain.Enums;

namespace Task_Management.Application.Queries.Tasks
{
    public record GetTasksByStatusQuery(TaskType Status) : IRequest<IEnumerable<TaskDto>>;

    public class GetTasksByStatusQueryHandler : IRequestHandler<GetTasksByStatusQuery, IEnumerable<TaskDto>>
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        public GetTasksByStatusQueryHandler(ITaskRepository taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TaskDto>> Handle(GetTasksByStatusQuery request, CancellationToken cancellationToken)
        {
            var tasks = await _taskRepository.GetTaskByStatusAsync(request.Status);
            return _mapper.Map<IEnumerable<TaskDto>>(tasks);
        }
    }
}
