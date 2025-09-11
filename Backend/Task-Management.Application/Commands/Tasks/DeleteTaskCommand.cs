using MediatR;
using Task_Management.Application.Interfaces;

namespace Task_Management.Application.Commands.Tasks
{
    public record DeleteTaskCommand(int TaskId) : IRequest<bool>;
    public class DeleteTaskCommandHandler : IRequestHandler<DeleteTaskCommand, bool>
    {
        private readonly ITaskRepository _repository;

        public DeleteTaskCommandHandler(ITaskRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(DeleteTaskCommand request, CancellationToken cancellationToken)
        {
            var task = await _repository.GetByIdAsync(request.TaskId);
            if (task == null)
            {
                return false;
            }
            return await _repository.DeleteAsync(task);

        }
    }

}
