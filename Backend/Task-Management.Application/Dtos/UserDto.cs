using System.Text.Json.Serialization;
using Task_Management.Domain.Enums;

namespace Task_Management.Application.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public RoleType Role { get; set; }
    }

    public class CreateUserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UpdateUserDto : CreateUserDto
    {
        public RoleType Role { get; set; }
    }

    public class LoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class AuthResponse
    {
        public UserDto User { get; set; }
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
