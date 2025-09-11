using MediatR;
using Microsoft.AspNetCore.Mvc;
using Task_Management.Application.Dtos;
using Task_Management.Application.Queries.Users;

namespace Task_Management.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<AuthResponseDto>> LoginAsync([FromBody] LoginDto dto)
        {
            var query = new LoginQuery(dto);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

    }
}
