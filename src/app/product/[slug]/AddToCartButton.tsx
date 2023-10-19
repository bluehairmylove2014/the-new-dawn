"use client";

import ButtonLoader from "@/components/atoms/ButtonLoader/ButtonLoader";
import { CommonButton } from "@/components/atoms/CommonButton/CommonButton";
import { SimpleLoader } from "@/components/atoms/SimpleLoader/SimpleLoader";
import { useNotification } from "@/components/molecules/Notification/Notification";
import { useAddToCart } from "@/modules/business-logic/lib/cart";
import { IProduct } from "@/modules/services/entities";
import { useEffect } from "react";

const AddToCartButton = ({
  product,
  quantity,
}: {
  product: IProduct;
  quantity: number;
}) => {
  const { onAddToCart, isLoading } = useAddToCart();
  const { showError, showSuccess } = useNotification();

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  return (
    <CommonButton
      style={"modern-onlyBorder"}
      onClick={() => {
        if (quantity > 0) {
          onAddToCart({ item: product, quantity }, false)
            .then((msg) => showSuccess(msg))
            .catch((error) => showError(error.message));
        } else {
          showError("Số lượng phải lớn hơn 0");
        }
      }}
      loading={isLoading}
    >
      <p>
        <i className="fi fi-ss-shopping-cart-add"></i>&nbsp;Thêm vào giỏ hàng
      </p>
    </CommonButton>
  );
};

export default AddToCartButton;
