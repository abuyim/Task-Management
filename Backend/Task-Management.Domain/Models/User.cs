using Task_Management.Domain.Enums;

namespace Task_Management.Domain.Models
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public RoleType Role { get; set; }
    }
}
