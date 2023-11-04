using System;
using System.Collections.Generic;

namespace thenewdawn_be.Database.Models;

public partial class Rank
{
    public int RankId { get; set; }

    public string RankName { get; set; } = null!;

    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
}
