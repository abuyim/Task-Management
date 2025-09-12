using FluentValidation;
using Task_Management.Application.Dtos;

namespace TaskManagement.Application.Validators
{
    public class CreateUserValidator : AbstractValidator<CreateUserDto>
    {
        public CreateUserValidator()
        {
            RuleFor(x => x.Username).NotEmpty().WithMessage("UserName required")
                .MaximumLength(20).WithMessage("UerName should not be exceeed 20 characterss");
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email should not be empty")
                .EmailAddress().WithMessage("Invalid Email format");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Password reuired")
                .MinimumLength(8).WithMessage("Passord must be greater than 7 charcaters");

        }
    }
}
