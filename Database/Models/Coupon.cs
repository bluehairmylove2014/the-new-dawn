using System;
using System.Collections.Generic;

namespace thenewdawn_be.Database.Models;

public partial class Coupon
{
    public int CouponId { get; set; }

    public DateTime CouponCreateAt { get; set; }

    public int CouponQuantity { get; set; }

    public DateOnly CouponExpiryDate { get; set; }

    public string CouponCode { get; set; } = null!;

    public double CouponDiscount { get; set; }
}
