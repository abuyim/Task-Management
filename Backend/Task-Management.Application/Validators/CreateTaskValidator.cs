using FluentValidation;
using Task_Management.Application.Dtos;

namespace TaskManagement.Application.Validators
{
    public class CreateTaskValidator : AbstractValidator<CreateTaskDto>
    {
        public CreateTaskValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage("Title is Required")
                .MaximumLength(50).WithMessage("Title should not be exceed 50 characters");
            RuleFor(x => x.Description).NotEmpty().WithMessage("Description is required");
        }
    }
}
