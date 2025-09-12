using FluentValidation;
using Task_Management.Application.Dtos;

namespace Task_Management.Application.Validators
{
    public class UpdateTaskValidator : AbstractValidator<UpdateTaskDto>
    {
        public UpdateTaskValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required")
                .MaximumLength(50).WithMessage("Title should not exceed 50 characters");
            RuleFor(x => x.Description).NotEmpty().WithMessage("Description is required.");
        }
    }
}
