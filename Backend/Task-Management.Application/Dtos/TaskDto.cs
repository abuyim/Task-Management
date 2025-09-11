using Task_Management.Domain.Enums;

namespace Task_Management.Application.Dtos
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Assignee { get; set; }
        //[JsonConverter(typeof(JsonStringEnumConverter))]
        public TaskType Status { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
    }

    public class CreateTaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class UpdateTaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Assignee { get; set; }
        public TaskType Status { get; set; }
    }
}
