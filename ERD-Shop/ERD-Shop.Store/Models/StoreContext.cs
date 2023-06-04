using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ERD_Shop.Store.Models
{
    public partial class StoreContext : DbContext
    {
        public StoreContext()
        {
        }

        public StoreContext(DbContextOptions<StoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductVariant> ProductVariants { get; set; } = null!;
        public virtual DbSet<Stores> Stores { get; set; } = null!;
        public virtual DbSet<StoreCategory> StoreCategories { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DANDA;Initial Catalog=Store;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.CategoryImg)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("categoryImg");

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("categoryName");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.ProductId).HasColumnName("productID");

                entity.Property(e => e.ProductImg)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("productImg");

                entity.Property(e => e.ProductName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("productName");

                

                entity.Property(e => e.StoreId).HasColumnName("storeID");

             

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.StoreId)
                    .HasConstraintName("FK__Product__storeID__31EC6D26");
            });

            modelBuilder.Entity<ProductVariant>(entity =>
            {
                entity.ToTable("ProductVariant");

                entity.Property(e => e.ProductVariantId).HasColumnName("productVariantID");

                entity.Property(e => e.ProductVariantImg)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("productVariantImg");

                entity.Property(e => e.ProductVariantName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("productVariantName");

                entity.Property(e => e.ShortDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("shortDescription");

                entity.Property(e => e.SkuCode)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("skuCode");

                entity.Property(e => e.StockQuantity).HasColumnName("stockQuantity");
            });

            modelBuilder.Entity<Stores>(entity =>
            {
                entity.Property(e => e.StoreId).HasColumnName("storeID");

                entity.Property(e => e.StoreContact)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("storeContact");

                entity.Property(e => e.StoreImg)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("storeImg");

                entity.Property(e => e.StoreLocation)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("storeLocation");

                entity.Property(e => e.StoreName)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("storeName");

                entity.Property(e => e.StoreOwner)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("storeOwner");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Stores)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Store__User_Id__29572725");
            });

            modelBuilder.Entity<StoreCategory>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Store_Category");

                entity.Property(e => e.CategoryId).HasColumnName("categoryID");

                entity.Property(e => e.StoreId).HasColumnName("storeID");

                entity.HasOne(d => d.Category)
                    .WithMany()
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__Store_Cat__categ__2C3393D0");

                entity.HasOne(d => d.Store)
                    .WithMany()
                    .HasForeignKey(d => d.StoreId)
                    .HasConstraintName("FK__Store_Cat__store__2B3F6F97");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.HasIndex(e => e.Email, "UQ__User__A9D105344A8AA0D8")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.Property(e => e.Address)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Birthdate).HasColumnType("date");

                entity.Property(e => e.CityId).HasColumnName("City_Id");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("First_Name");

                entity.Property(e => e.LastName)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("Last_Name");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RoleId).HasColumnName("Role_Id");

                entity.Property(e => e.ZipCode).HasColumnName("Zip_Code");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
