using System;
using System.Collections.Generic;

namespace thenewdawn_be.Database.Models;

public partial class Account
{
    public int AccountId { get; set; }

    public string Email { get; set; } = null!;

    public string? Password { get; set; }

    public int RoleId { get; set; }

    public string FullName { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public string? Avatar { get; set; }

    public bool IsSocial { get; set; }

    public int? RankId { get; set; }

    public DateTime AccountCreatedAt { get; set; }

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual Rank? Rank { get; set; }

    public virtual Role Role { get; set; } = null!;
}
