using System;
using System.Collections.Generic;

namespace thenewdawn_be.Database.Models;

public partial class HotProduct
{
    public int HotProductId { get; set; }

    public int? ProductId { get; set; }

    public virtual Product? Product { get; set; }
}
