"use client";

import { CommonButton } from "@/components/atoms/CommonButton/CommonButton";
import { IProductDetail } from "@/modules/services/entities";

const BuyButton = ({ product }: { product: IProductDetail }) => {
  return (
    <CommonButton style={"modern-fill"} onClick={() => {}}>
      Mua ngay
    </CommonButton>
  );
};

export default BuyButton;
