using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ERD_Shop.Order.Models
{
    public partial class OrdersContext : DbContext
    {
        public OrdersContext()
        {
        }

        public OrdersContext(DbContextOptions<OrdersContext> options)
            : base(options)
        {
        }

        public virtual DbSet<DiscountCode> DiscountCodes { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<PaymentGateway> PaymentGateways { get; set; } = null!;
        public virtual DbSet<ProductVariant> ProductVariants { get; set; } = null!;
        public virtual DbSet<Refund> Refunds { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-ARI3COF;Initial Catalog=Orders;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DiscountCode>(entity =>
            {
                entity.HasKey(e => e.CodeValueId)
                    .HasName("PK__Discount__41389C083947874E");

                entity.ToTable("DiscountCode");

                entity.Property(e => e.CodeValueId).HasColumnName("codeValueID");

                entity.Property(e => e.ExpirationDate)
                    .HasColumnType("datetime")
                    .HasColumnName("expirationDate");

                entity.Property(e => e.UsageLimit).HasColumnName("usageLimit");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.DiscountCodes)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK__DiscountC__User___3C69FB99");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.OrderId).HasColumnName("orderID");

                entity.Property(e => e.CodeValueId).HasColumnName("codeValueID");

                entity.Property(e => e.OrderDate)
                    .HasColumnType("datetime")
                    .HasColumnName("orderDate");

                entity.Property(e => e.ShippingAddress)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("shippingAddress");

                entity.Property(e => e.TotalPrice).HasColumnName("totalPrice");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.CodeValue)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CodeValueId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK__Orders__codeValu__403A8C7D");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK__Orders__User_Id__3F466844");

                entity.HasMany(d => d.ProductVariants)
                    .WithMany(p => p.Orders)
                    .UsingEntity<Dictionary<string, object>>(
                        "OrderProductVariant",
                        l => l.HasOne<ProductVariant>().WithMany().HasForeignKey("ProductVariantId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__Order_Pro__produ__534D60F1"),
                        r => r.HasOne<Order>().WithMany().HasForeignKey("OrderId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__Order_Pro__order__52593CB8"),
                        j =>
                        {
                            j.HasKey("OrderId", "ProductVariantId").HasName("PK__Order_Pr__0F3FC175B14588FB");

                            j.ToTable("Order_ProductVariant");

                            j.IndexerProperty<int>("OrderId").HasColumnName("orderID");

                            j.IndexerProperty<int>("ProductVariantId").HasColumnName("productVariantID");
                        });
            });

            modelBuilder.Entity<PaymentGateway>(entity =>
            {
                entity.ToTable("PaymentGateway");

                entity.Property(e => e.PaymentGatewayId).HasColumnName("paymentGatewayID");

                entity.Property(e => e.PaymentAmount).HasColumnName("paymentAmount");

                entity.Property(e => e.PaymentGatewayName)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("paymentGatewayName");

                entity.Property(e => e.PaymentMethod)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("paymentMethod");

                entity.Property(e => e.PaymentStatus)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("paymentStatus");

                entity.Property(e => e.PaymentTransactionId).HasColumnName("paymentTransactionId");
            });

            modelBuilder.Entity<ProductVariant>(entity =>
            {
                entity.ToTable("ProductVariant");

                entity.Property(e => e.ProductVariantId).HasColumnName("productVariantID");

                entity.Property(e => e.Name)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Price).HasColumnName("price");
            });

            modelBuilder.Entity<Refund>(entity =>
            {
                entity.ToTable("Refund");

                entity.Property(e => e.RefundId).HasColumnName("refundID");

                entity.Property(e => e.OrderId).HasColumnName("orderID");

                entity.Property(e => e.RefundDate)
                    .HasColumnType("datetime")
                    .HasColumnName("refundDate");

                entity.Property(e => e.RefundStatus)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("refundStatus");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Refunds)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK__Refund__orderID__4AB81AF0");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Refunds)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK__Refund__User_Id__4BAC3F29");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.HasIndex(e => e.Email, "UQ__User__A9D105345F1CE09E")
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
