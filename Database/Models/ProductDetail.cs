using System;
using System.Collections.Generic;

namespace thenewdawn_be.Database.Models;

public partial class ProductDetail
{
    public int ProductDetailId { get; set; }

    public int? ProductId { get; set; }

    public string ProductDetailTag { get; set; } = null!;

    public string? ProductDetailSrc { get; set; }

    public string? ProductDetailAlt { get; set; }

    public string? ProductDetailChildren { get; set; }

    public virtual Product? Product { get; set; }
}
