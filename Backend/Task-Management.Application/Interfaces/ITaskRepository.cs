using Task_Management.Domain.Enums;
using Task_Management.Domain.Models;

namespace Task_Management.Application.Interfaces
{
    public interface ITaskRepository : IGenericRepository<TaskItem>
    {
        Task<IEnumerable<TaskItem>> GetTaskByStatusAsync(TaskType t);
        Task<IEnumerable<TaskItem>> GetTaskByAssigneeAsync(int userId);
    }
}
