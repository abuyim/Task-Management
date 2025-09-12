using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Task_Management.Application.Commands.Users;
using Task_Management.Application.Dtos;
using Task_Management.Application.Queries.Users;

namespace Task_Management.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersAsync()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var role = User.FindFirstValue(ClaimTypes.Role);
            if (userId == null)
            {
                return Unauthorized("User not authenticated");
            }


            if (userId == null)
            {
                return Unauthorized("User not authenticated");
            }

            var query = new GetUsersQuery();
            var users = await _mediator.Send(query);
            return Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult<AuthResponseDto>> CreateUserAsync([FromBody] CreateUserDto request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("User not authenticated");
            }
            var command = new CreateUserCommand(request);
            var user = await _mediator.Send(command);
            return Ok(user);

        }
    }
}
