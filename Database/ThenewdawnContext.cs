using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using thenewdawn_be.Database.Models;

namespace thenewdawn_be.Database;

public partial class ThenewdawnContext : DbContext
{
    public ThenewdawnContext()
    {
    }

    public ThenewdawnContext(DbContextOptions<ThenewdawnContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Coupon> Coupons { get; set; }

    public virtual DbSet<HotProduct> HotProducts { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductDetail> ProductDetails { get; set; }

    public virtual DbSet<ProductFeature> ProductFeatures { get; set; }

    public virtual DbSet<ProductImage> ProductImages { get; set; }

    public virtual DbSet<ProductSpecification> ProductSpecifications { get; set; }

    public virtual DbSet<Rank> Ranks { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => base.OnConfiguring(optionsBuilder);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.AccountId).HasName("Account_pkey");

            entity.ToTable("Account");

            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.AccountCreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("accountCreatedAt");
            entity.Property(e => e.Avatar)
                .HasDefaultValueSql("random_avatar()")
                .HasColumnName("avatar");
            entity.Property(e => e.Email)
                .HasMaxLength(125)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(125)
                .HasColumnName("fullName");
            entity.Property(e => e.IsSocial).HasColumnName("isSocial");
            entity.Property(e => e.Password)
                .HasMaxLength(300)
                .HasColumnName("password");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .HasColumnName("phoneNumber");
            entity.Property(e => e.RankId).HasColumnName("rankId");
            entity.Property(e => e.RoleId).HasColumnName("roleId");

            entity.HasOne(d => d.Rank).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.RankId)
                .HasConstraintName("Account_rankId_fkey");

            entity.HasOne(d => d.Role).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Account_roleId_fkey");
        });

        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.AddressId).HasName("Address_pkey");

            entity.ToTable("Address");

            entity.Property(e => e.AddressId).HasColumnName("addressId");
            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.Country)
                .HasMaxLength(50)
                .HasColumnName("country");
            entity.Property(e => e.District)
                .HasMaxLength(50)
                .HasColumnName("district");
            entity.Property(e => e.Province)
                .HasMaxLength(50)
                .HasColumnName("province");
            entity.Property(e => e.StreetAddress)
                .HasMaxLength(125)
                .HasColumnName("streetAddress");
            entity.Property(e => e.Ward)
                .HasMaxLength(50)
                .HasColumnName("ward");

            entity.HasOne(d => d.Account).WithMany(p => p.Addresses)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("Address_accountId_fkey");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.ProductId }).HasName("Cart_pkey");

            entity.ToTable("Cart");

            entity.Property(e => e.UserId).HasColumnName("userId");
            entity.Property(e => e.ProductId).HasColumnName("productId");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("1")
                .HasColumnName("quantity");

            entity.HasOne(d => d.Product).WithMany(p => p.Carts)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Cart_productId_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Carts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Cart_userId_fkey");
        });

        modelBuilder.Entity<Coupon>(entity =>
        {
            entity.HasKey(e => e.CouponId).HasName("Coupon_pkey");

            entity.ToTable("Coupon");

            entity.Property(e => e.CouponId).HasColumnName("couponId");
            entity.Property(e => e.CouponCode)
                .HasMaxLength(255)
                .HasColumnName("couponCode");
            entity.Property(e => e.CouponCreateAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("couponCreateAt");
            entity.Property(e => e.CouponDiscount).HasColumnName("couponDiscount");
            entity.Property(e => e.CouponExpiryDate).HasColumnName("couponExpiryDate");
            entity.Property(e => e.CouponQuantity).HasColumnName("couponQuantity");
        });

        modelBuilder.Entity<HotProduct>(entity =>
        {
            entity.HasKey(e => e.HotProductId).HasName("HotProduct_pkey");

            entity.ToTable("HotProduct");

            entity.Property(e => e.HotProductId).HasColumnName("hotProductId");
            entity.Property(e => e.ProductId).HasColumnName("productId");

            entity.HasOne(d => d.Product).WithMany(p => p.HotProducts)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("HotProduct_productId_fkey");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("Product_pkey");

            entity.ToTable("Product");

            entity.Property(e => e.ProductId).HasColumnName("productId");
            entity.Property(e => e.ProductCategory)
                .HasMaxLength(50)
                .HasColumnName("productCategory");
            entity.Property(e => e.ProductCreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("productCreatedAt");
            entity.Property(e => e.ProductDiscount)
                .HasPrecision(14, 2)
                .HasColumnName("productDiscount");
            entity.Property(e => e.ProductName)
                .HasMaxLength(255)
                .HasColumnName("productName");
            entity.Property(e => e.ProductPrice)
                .HasPrecision(14, 2)
                .HasColumnName("productPrice");
            entity.Property(e => e.ProductStock).HasColumnName("productStock");
            entity.Property(e => e.ProductThumbnail).HasColumnName("productThumbnail");
        });

        modelBuilder.Entity<ProductDetail>(entity =>
        {
            entity.HasKey(e => e.ProductDetailId).HasName("ProductDetail_pkey");

            entity.ToTable("ProductDetail");

            entity.Property(e => e.ProductDetailId).HasColumnName("productDetailId");
            entity.Property(e => e.ProductDetailAlt)
                .HasMaxLength(255)
                .HasColumnName("productDetailAlt");
            entity.Property(e => e.ProductDetailChildren).HasColumnName("productDetailChildren");
            entity.Property(e => e.ProductDetailSrc).HasColumnName("productDetailSrc");
            entity.Property(e => e.ProductDetailTag)
                .HasMaxLength(5)
                .HasColumnName("productDetailTag");
            entity.Property(e => e.ProductId).HasColumnName("productId");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductDetails)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("ProductDetail_productId_fkey");
        });

        modelBuilder.Entity<ProductFeature>(entity =>
        {
            entity.HasKey(e => e.FeatureId).HasName("ProductFeature_pkey");

            entity.ToTable("ProductFeature");

            entity.Property(e => e.FeatureId).HasColumnName("featureId");
            entity.Property(e => e.FeatureName)
                .HasMaxLength(125)
                .HasColumnName("featureName");
            entity.Property(e => e.ProductId).HasColumnName("productId");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductFeatures)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("ProductFeature_productId_fkey");
        });

        modelBuilder.Entity<ProductImage>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("ProductImages_pkey");

            entity.Property(e => e.ImageId).HasColumnName("imageId");
            entity.Property(e => e.ImageAlt)
                .HasMaxLength(255)
                .HasColumnName("imageAlt");
            entity.Property(e => e.ImageCreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("imageCreatedAt");
            entity.Property(e => e.ImageSrc).HasColumnName("imageSrc");
            entity.Property(e => e.ProductId).HasColumnName("productId");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductImages)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("ProductImages_productId_fkey");
        });

        modelBuilder.Entity<ProductSpecification>(entity =>
        {
            entity.HasKey(e => e.ProductSpecificationId).HasName("ProductSpecification_pkey");

            entity.ToTable("ProductSpecification");

            entity.Property(e => e.ProductSpecificationId).HasColumnName("productSpecificationId");
            entity.Property(e => e.ProductId).HasColumnName("productId");
            entity.Property(e => e.ProductSpecificationDetail)
                .HasMaxLength(255)
                .HasColumnName("productSpecificationDetail");
            entity.Property(e => e.ProductSpecificationName)
                .HasMaxLength(255)
                .HasColumnName("productSpecificationName");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductSpecifications)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("ProductSpecification_productId_fkey");
        });

        modelBuilder.Entity<Rank>(entity =>
        {
            entity.HasKey(e => e.RankId).HasName("Rank_pkey");

            entity.ToTable("Rank");

            entity.Property(e => e.RankId).HasColumnName("rankId");
            entity.Property(e => e.RankName)
                .HasMaxLength(10)
                .HasColumnName("rankName");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("Role_pkey");

            entity.ToTable("Role");

            entity.Property(e => e.RoleId).HasColumnName("roleId");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .HasColumnName("roleName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
