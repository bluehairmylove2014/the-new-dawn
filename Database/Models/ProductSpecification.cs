using System;
using System.Collections.Generic;

namespace thenewdawn_be.Database.Models;

public partial class ProductSpecification
{
    public int ProductSpecificationId { get; set; }

    public int? ProductId { get; set; }

    public string ProductSpecificationName { get; set; } = null!;

    public string ProductSpecificationDetail { get; set; } = null!;

    public virtual Product? Product { get; set; }
}
