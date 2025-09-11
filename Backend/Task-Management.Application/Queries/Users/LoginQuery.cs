using AutoMapper;
using MediatR;
using Task_Management.Application.Dtos;
using Task_Management.Application.Interfaces;
using Task_Management.Application.Services;

namespace Task_Management.Application.Queries.Users
{
    public record LoginQuery(LoginDto dto) : IRequest<AuthResponseDto>;

    public class LoginQueryHandler : IRequestHandler<LoginQuery, AuthResponseDto>
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;
        public LoginQueryHandler(IMapper mapper, IUserRepository userRepository, IJwtService jwtService)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        public async Task<AuthResponseDto> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetUserByUserNameAsync(request.dto.Username);
            if (user == null)
            {
                throw new Exception("User doesn't exist.");
            }
            if (!BCrypt.Net.BCrypt.Verify(request.dto.Password, user.Password))
            {
                throw new Exception("InValid Credentials");
            }
            var exp = DateTime.UtcNow.AddHours(6);
            var token = _jwtService.GenerateToken(user, exp);
            var userDto = _mapper.Map<UserDto>(user);

            return new AuthResponseDto
            {
                User = userDto,
                Expiration = exp,
                Token = token
            };

        }
    }
}
