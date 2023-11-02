'use client';

import { CommonButton } from '@presentational/atoms/CommonButton/CommonButton';
import { useNotification } from '@presentational/molecules/Notification/Notification';
import { useAddToCart } from '@modules/business-logic/lib/cart';
import { IProduct } from '@modules/services/entities';

const AddToCartButton = ({
  product,
  quantity,
}: {
  product: IProduct;
  quantity: number;
}) => {
  const { onAddToCart, isLoading } = useAddToCart();
  const { showError, showSuccess } = useNotification();

  return (
    <CommonButton
      style={'modern-onlyBorder'}
      onClick={() => {
        if (quantity > 0) {
          onAddToCart({ item: product, quantity }, false)
            .then((msg) => showSuccess(msg))
            .catch((error) => showError(error.message));
        } else {
          showError('Số lượng phải lớn hơn 0');
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
