using Microsoft.EntityFrameworkCore;
using Task_Management.Application.Commands.Users;
using Task_Management.Application.Interfaces;
using Task_Management.Application.Mapping;
using Task_Management.Application.Services;
using Task_Management.Infrastructure;
using Task_Management.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var services = builder.Services;

services.AddAutoMapper(cfg =>
{
    cfg.AddProfile(new UserProfile());
    cfg.AddProfile(new TaskProfile());
});
var conn = builder.Configuration.GetConnectionString("TaskMgtConnection");
services.AddDbContext<TaskDbContext>(options => options.UseSqlServer(conn));
services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(Program).Assembly, typeof(CreateUserCommand).Assembly));
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
services.AddCors(options => options.AddPolicy("AllowAllOrigins", builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));


services.AddScoped<ITaskRepository, TaskRepository>();
services.AddScoped<IUserRepository, UserRepository>();
services.AddScoped<IJwtService, JwtService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
