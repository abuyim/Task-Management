using Task_Management.Domain.Models;

namespace Task_Management.Application.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> GetUserByUserNameAsync(string Email);
        Task<User> GetUserByEmailAsync(string UserName);
    }
}
