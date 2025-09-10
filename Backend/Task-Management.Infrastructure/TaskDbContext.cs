using Microsoft.EntityFrameworkCore;
using Task_Management.Domain.Enums;
using Task_Management.Domain.Models;

namespace Task_Management.Infrastructure
{
    public class TaskDbContext : DbContext
    {

        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskItem>(entity =>
            {
                entity.HasKey(t => t.Id);
                entity.Property(t => t.Title).IsRequired().HasMaxLength(50);
                entity.Property(t => t.Description).IsRequired().HasMaxLength(500);
                entity.Property(t => t.Status).HasDefaultValue(TaskType.Todo);

            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Username).IsRequired();
                entity.Property(u => u.Email).IsRequired();
                entity.Property(u => u.Role).HasDefaultValue(RoleType.User);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.HasIndex(u => u.Username).IsUnique();
            });
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "admin@test.com",
                    Username = "admin",
                    Role = RoleType.Admin,
                    Password = "$2a$12$EIXqJZbT2e6rF.8LxVoX9O5Xv3Fvwbz98gD3o3mFvJqHd.JdYz7bW", //test123
                    CreatedAt = new DateTime(2025, 01, 01)
                });
        }

    }
}
