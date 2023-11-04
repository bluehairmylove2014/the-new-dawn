using System;
using System.Collections.Generic;

namespace thenewdawn_be.Database.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductThumbnail { get; set; } = null!;

    public string ProductName { get; set; } = null!;

    public string ProductCategory { get; set; } = null!;

    public decimal ProductPrice { get; set; }

    public decimal ProductDiscount { get; set; }

    public int ProductStock { get; set; }

    public DateTime ProductCreatedAt { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<HotProduct> HotProducts { get; set; } = new List<HotProduct>();

    public virtual ICollection<ProductDetail> ProductDetails { get; set; } = new List<ProductDetail>();

    public virtual ICollection<ProductFeature> ProductFeatures { get; set; } = new List<ProductFeature>();

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

    public virtual ICollection<ProductSpecification> ProductSpecifications { get; set; } = new List<ProductSpecification>();
}
