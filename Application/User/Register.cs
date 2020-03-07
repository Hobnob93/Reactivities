using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Extensions;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty()
                    .EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext context;
            private readonly UserManager<AppUser> userManager;
            private readonly IJwtGenerator jwtGenerator;

            public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                this.context = context;
                this.userManager = userManager;
                this.jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await context.Users.Where(x => x.Email == request.Email).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

                if (await context.Users.Where(x => x.UserName == request.Username).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { Username = "Username already exists" });

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Username
                };

                var result = await userManager.CreateAsync(user, request.Password);
                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Username = user.UserName,
                        Token = jwtGenerator.CreateToken(user)
                    };
                }

                throw new Exception("Error creating user");
            }
        }
    }
}