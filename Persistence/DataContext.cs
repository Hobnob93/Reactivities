using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }


        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "Value101" },
                    new Value { Id = 2, Name = "Value102" },
                    new Value { Id = 3, Name = "Value103" }
                );

            builder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.AppUserId, ua.ActivityId }));
            builder.Entity<UserActivity>()
                .HasOne(ua => ua.AppUser)
                .WithMany(u => u.UserActivities)
                .HasForeignKey(ua => ua.AppUserId);

            builder.Entity<UserActivity>()
                .HasOne(ua => ua.Activity)
                .WithMany(u => u.UserActivities)
                .HasForeignKey(ua => ua.ActivityId);
        }
    }
}
