using Microsoft.EntityFrameworkCore;
using Task_Management.Application.Interfaces;
using Task_Management.Domain.Models;

namespace Task_Management.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly TaskDbContext _dbContext;

        public UserRepository(TaskDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateAsync(User model)
        {
            await _dbContext.Users.AddAsync(model);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(User model)
        {
            _dbContext.Remove(model);
            var result = await _dbContext.SaveChangesAsync();
            return result > 0;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _dbContext.Users.FindAsync(id);
        }

        public async Task UpdateAsync(User model)
        {
            _dbContext.Users.Update(model);
            await _dbContext.SaveChangesAsync();
        }
    }
}
