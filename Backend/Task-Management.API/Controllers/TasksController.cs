using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Task_Management.Application.Commands.Tasks;
using Task_Management.Application.Dtos;
using Task_Management.Application.Queries.Tasks;
using Task_Management.Domain.Enums;

namespace Task_Management.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TasksController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasksAsync()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized("User not authenticated");
            }

            var query = new GetTasksQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasksByIdAsync(int TaskId)
        {
            var query = new GetTaskQuery(TaskId);
            var result = await _mediator.Send(query);
            return Ok(result);
        }


        [HttpGet("assignee/{Id}")]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasksByAssigneeAsync(int AssigneeId)
        {
            var query = new GetTasksByAssigneeQuery(AssigneeId);
            var result = await _mediator.Send(query);
            return Ok(result);
        }
        [HttpGet("status/{Status}")]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasksByIdAsync(TaskType Status)
        {
            var query = new GetTasksByStatusQuery(Status);
            var result = await _mediator.Send(query);
            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTaskAsync([FromBody] CreateTaskDto createTaskdto)
        {
            var userId = IsValidUser();
            if (userId == 0)
                return Unauthorized("User not authenticated");

            var command = new CreateTaskCommand(createTaskdto, userId);
            var task = await _mediator.Send(command);
            return Ok(task);
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult<TaskDto>> UpdateTaskAsync(int Id, [FromBody] UpdateTaskDto updateTaskdto)
        {
            var userId = IsValidUser();
            if (userId == 0)
                return Unauthorized("User not authenticated");
            var command = new UpdateTaskCommand(updateTaskdto, Id, userId);
            var task = await _mediator.Send(command);
            return Ok(task);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteTaskAsync(int Id)
        {
            var id = IsValidUser();
            if (id == 0)
                return Unauthorized("User not authenticated");

            var command = new DeleteTaskCommand(Id);
            await _mediator.Send(command);
            return NoContent();
        }

        private int IsValidUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return 0;
            }
            return int.Parse(userId);
        }

    }
}
