using FluentValidation;

namespace Application.Extensions
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder.NotEmpty()
                    .MinimumLength(6).WithMessage("Password must contain at least 6 characters")
                    .Matches("[A-Z]").WithMessage("Password must contain at least one upper case character")
                    .Matches("[a-z]").WithMessage("Password must contain at least one lower case character")
                    .Matches("[0-9]").WithMessage("Password must contain at least one number")
                    .Matches(@"[^\w]").WithMessage("Password must contain at least one alpha-numeric character");
        }
    }
}