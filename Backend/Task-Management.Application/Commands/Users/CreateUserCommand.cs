using AutoMapper;
using MediatR;
using Task_Management.Application.Dtos;
using Task_Management.Application.Interfaces;
using Task_Management.Application.Services;
using Task_Management.Domain.Models;

namespace Task_Management.Application.Commands.Users
{
    public record CreateUserCommand(CreateUserDto UserDto) : IRequest<AuthResponse>;

    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, AuthResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IJwtService _jwtService;

        public CreateUserCommandHandler(IMapper mapper, IUserRepository userRepository, IJwtService jwtService)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        public async Task<AuthResponse> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {

            var checkUserByEmail = await _userRepository.GetUserByEmailAsync(request.UserDto.Email);
            var checkByUserName = await _userRepository.GetUserByUserNameAsync(request.UserDto.Username);

            if (checkUserByEmail != null || checkByUserName != null)
            {
                throw new Exception("User already Exist with this email or uerName");
            }
            var user = _mapper.Map<User>(request.UserDto);
            user.CreatedAt = DateTime.UtcNow;
            user.Password = BCrypt.Net.BCrypt.HashPassword(request.UserDto.Password);

            var expDate = DateTime.UtcNow.AddHours(6);

            await _userRepository.CreateAsync(user);
            var token = _jwtService.GenerateToken(user, expDate);
            var userDto = _mapper.Map<UserDto>(user);
            return new AuthResponse
            {
                Token = token,
                User = userDto,
                Expiration = expDate
            };

        }
    }
}
