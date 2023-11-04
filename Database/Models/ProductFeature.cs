using System;
using System.Collections.Generic;

namespace thenewdawn_be.Database.Models;

public partial class ProductFeature
{
    public int FeatureId { get; set; }

    public int? ProductId { get; set; }

    public string FeatureName { get; set; } = null!;

    public virtual Product? Product { get; set; }
}
