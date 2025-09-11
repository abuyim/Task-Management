using MediatR;
using Microsoft.AspNetCore.Mvc;
using Task_Management.Application.Commands.Tasks;
using Task_Management.Application.Dtos;
using Task_Management.Application.Queries.Tasks;
using Task_Management.Domain.Enums;

namespace Task_Management.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTaskAsync([FromBody] CreateTaskDto createTaskdto)
        {
            var userId = 1; //int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value) > 0 ? int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value) : 1;
            var command = new CreateTaskCommand(createTaskdto, userId);
            var task = await _mediator.Send(command);
            return Ok(task);
        }
        [HttpPut("{Id}")]
        public async Task<ActionResult<TaskDto>> UpdateTaskAsync(int Id, [FromBody] UpdateTaskDto updateTaskdto)
        {
            var userId = 1; // int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value) > 0 ? int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value) : 1;
            var command = new UpdateTaskCommand(updateTaskdto, Id, userId);
            var task = await _mediator.Send(command);
            return Ok(task);
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteTaskAsync(int Id)
        {
            var command = new DeleteTaskCommand(Id);
            await _mediator.Send(command);
            return NoContent();
        }

    }
}
