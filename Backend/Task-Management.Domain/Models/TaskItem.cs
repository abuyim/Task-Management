using Task_Management.Domain.Enums;

namespace Task_Management.Domain.Models
{
    public class TaskItem : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Assignee { get; set; }
        public int Priority { get; set; }
        public int CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }
        public TaskType Status { get; set; }
    }
}
