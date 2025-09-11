using AutoMapper;
using MediatR;
using Task_Management.Application.Dtos;
using Task_Management.Application.Interfaces;

namespace Task_Management.Application.Queries.Tasks
{
    public record GetTasksByAssigneeQuery(int AssigneeId) : IRequest<IEnumerable<TaskDto>>;

    public class GetTasksByAssigneeQueryHandler : IRequestHandler<GetTasksByAssigneeQuery, IEnumerable<TaskDto>>
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        public GetTasksByAssigneeQueryHandler(ITaskRepository taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TaskDto>> Handle(GetTasksByAssigneeQuery request, CancellationToken cancellationToken)
        {
            var tasks = await _taskRepository.GetTaskByAssigneeAsync(request.AssigneeId);
            return _mapper.Map<IEnumerable<TaskDto>>(tasks);
        }
    }
}
