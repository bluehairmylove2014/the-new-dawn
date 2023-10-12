"use client";

import { CommonButton } from "@/components/atoms/CommonButton/CommonButton";
import { IProductDetail } from "@/modules/services/entities";

const AddToCartButton = ({ product }: { product: IProductDetail }) => {
  return (
    <CommonButton style={"modern-onlyBorder"} onClick={() => {}}>
      <p>
        <i className="fi fi-ss-shopping-cart-add"></i>&nbsp;Thêm vào giỏ hàng
      </p>
    </CommonButton>
  );
};

export default AddToCartButton;
