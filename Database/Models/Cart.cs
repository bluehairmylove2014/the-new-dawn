using System;
using System.Collections.Generic;

namespace thenewdawn_be.Database.Models;

public partial class Cart
{
    public int UserId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual Account User { get; set; } = null!;
}
