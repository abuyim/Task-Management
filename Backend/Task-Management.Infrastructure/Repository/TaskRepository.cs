using Microsoft.EntityFrameworkCore;
using Task_Management.Application.Interfaces;
using Task_Management.Domain.Enums;
using Task_Management.Domain.Models;

namespace Task_Management.Infrastructure.Repository
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskDbContext _dbContext;

        public TaskRepository(TaskDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateAsync(TaskItem model)
        {
            await _dbContext.Tasks.AddAsync(model);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(TaskItem model)
        {
            _dbContext.Remove(model);
            var result = await _dbContext.SaveChangesAsync();
            return result > 0;
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync()
        {
            return await _dbContext.Tasks.ToListAsync();
        }

        public async Task<TaskItem> GetByIdAsync(int id)
        {
            return await _dbContext.Tasks.FindAsync(id);
        }

        public async Task<IEnumerable<TaskItem>> GetTaskByAssigneeAsync(int userId)
        {
            return await _dbContext.Tasks.Where(t => t.Assignee == userId).ToListAsync();
        }

        public async Task<IEnumerable<TaskItem>> GetTaskByStatusAsync(TaskType status)
        {
            return await _dbContext.Tasks.Where(t => t.Status == status).ToListAsync();
        }

        public async Task UpdateAsync(TaskItem model)
        {
            _dbContext.Tasks.Update(model);
            await _dbContext.SaveChangesAsync();
        }
    }
}
