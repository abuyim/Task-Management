using AutoMapper;
using MediatR;
using Task_Management.Application.Dtos;
using Task_Management.Application.Interfaces;

namespace Task_Management.Application.Queries.Tasks
{
    public record GetTaskQuery(int AssigneeId) : IRequest<TaskDto>;

    public class GetTaskQueryHandler : IRequestHandler<GetTaskQuery, TaskDto>
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        public GetTaskQueryHandler(ITaskRepository taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }

        public async Task<TaskDto> Handle(GetTaskQuery request, CancellationToken cancellationToken)
        {
            var tasks = await _taskRepository.GetTaskByAssigneeAsync(request.AssigneeId);
            return _mapper.Map<TaskDto>(tasks);
        }
    }
}
