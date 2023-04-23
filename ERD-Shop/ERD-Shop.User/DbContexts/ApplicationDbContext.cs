using Microsoft.AspNetCore.Identity;
using ERD_Shop.User.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.User.DbContexts
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<City> Cities { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<IProductVariant> ProductVariants { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedRoles(builder);
            builder.Entity<ApplicationUser>()
                .HasOne(u => u.User_City)
                .WithMany()
                .HasForeignKey(u => u.City_Id)
                .OnDelete(DeleteBehavior.SetNull);
            builder.Entity<City>().HasOne(c => c.City_Country)
                .WithMany()
                .HasForeignKey(c => c.Country_Id)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Wishlist>().HasOne(w => w.User)
                .WithMany()
                .HasForeignKey(w => w.ApplicationUserId)
                .OnDelete(DeleteBehavior.Cascade);

        }
        private static void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole() { Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "Admin" },
                new IdentityRole() { Name = "User", ConcurrencyStamp = "2", NormalizedName = "User" },
                new IdentityRole() { Name = "Store Keeper", ConcurrencyStamp = "3", NormalizedName = "Store Keeper" }
                );
        }
    }
}
