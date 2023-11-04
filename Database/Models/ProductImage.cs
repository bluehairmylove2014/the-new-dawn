using System;
using System.Collections.Generic;

namespace thenewdawn_be.Database.Models;

public partial class ProductImage
{
    public int ImageId { get; set; }

    public int? ProductId { get; set; }

    public string ImageSrc { get; set; } = null!;

    public string ImageAlt { get; set; } = null!;

    public DateTime ImageCreatedAt { get; set; }

    public virtual Product? Product { get; set; }
}
