'use client';

import { CommonButton } from '@presentational/atoms/CommonButton/CommonButton';
import { useNotification } from '@presentational/molecules/Notification/Notification';
import { PAGE_URLS } from '@constants/pages';
import { useAddToCart } from '@modules/business-logic/lib/cart';
import { IProduct } from '@modules/services/entities';
import { useRouter } from 'next/navigation';

const BuyButton = ({
  product,
  quantity,
}: {
  product: IProduct;
  quantity: number;
}) => {
  const { onAddToCart, isLoading } = useAddToCart();
  const { showError } = useNotification();
  const router = useRouter();

  return (
    <CommonButton
      style={'modern-fill'}
      onClick={() => {
        if (quantity > 0) {
          onAddToCart({ item: product, quantity }, false)
            .then((msg) => router.push(PAGE_URLS.CART))
            .catch((error) => showError(error.message));
        } else {
          showError('Số lượng phải lớn hơn 0');
        }
      }}
      loading={isLoading}
    >
      <p>Mua ngay</p>
    </CommonButton>
  );
};

export default BuyButton;
