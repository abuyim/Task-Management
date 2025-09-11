using Task_Management.Domain.Models;

namespace Task_Management.Application.Services
{
    public interface IJwtService
    {
        public string GenerateToken(User user, DateTime exp);
    }
}
