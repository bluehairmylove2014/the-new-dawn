using System;
using System.Collections.Generic;

namespace thenewdawn_be.Database.Models;

public partial class Address
{
    public int AddressId { get; set; }

    public int? AccountId { get; set; }

    public string? Country { get; set; }

    public string? Province { get; set; }

    public string? District { get; set; }

    public string? Ward { get; set; }

    public string? StreetAddress { get; set; }

    public virtual Account? Account { get; set; }
}
