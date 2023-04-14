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
        public virtual DbSet<DiscountCode> DiscountCodes { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductVariant> ProductVariants { get; set; } = null!;
        public virtual DbSet<Store> Stores { get; set; } = null!;
        public virtual DbSet<StoreCategory> StoreCategories { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DANDA;Initial Catalog=Store;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.CategoryId).HasColumnName("categoryID");

                entity.Property(e => e.CategoryImg)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("categoryImg");

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("categoryName");
            });

            modelBuilder.Entity<DiscountCode>(entity =>
            {
                entity.HasKey(e => e.DiscountId)
                    .HasName("PK__Discount__D2130A0634B4679D");

                entity.ToTable("DiscountCode");

                entity.Property(e => e.DiscountId).HasColumnName("discountID");

                entity.Property(e => e.CodeValue)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("codeValue");

                entity.Property(e => e.Expiration).HasColumnName("expiration");
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

                entity.Property(e => e.ProductVariantId).HasColumnName("productVariantID");

                entity.HasOne(d => d.ProductVariant)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.ProductVariantId)
                    .HasConstraintName("FK__Product__product__2F10007B");
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

            modelBuilder.Entity<Store>(entity =>
            {
                entity.ToTable("Store");

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
                    .HasConstraintName("FK__Store_Cat__categ__38996AB5");

                entity.HasOne(d => d.Store)
                    .WithMany()
                    .HasForeignKey(d => d.StoreId)
                    .HasConstraintName("FK__Store_Cat__store__37A5467C");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
