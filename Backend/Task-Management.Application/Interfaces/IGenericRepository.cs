using Task_Management.Domain.Models;

namespace Task_Management.Application.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task CreateAsync(T model);
        Task UpdateAsync(T model);
        Task<bool> DeleteAsync(T model);

    }
}
