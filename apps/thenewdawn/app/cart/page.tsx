'use client';
import Checkbox from '@presentational/atoms/Checkbox/Checkbox';
import { CommonButton } from '@presentational/atoms/CommonButton/CommonButton';
import Quantity from '@presentational/molecules/Quantity/Quantity';
import {
  useAddToCart,
  useDeleteFromCart,
  useGetCartItems,
} from '@modules/business-logic/lib/cart';
import { onConvertNumberToCurrency } from '@utils/helpers';
import Image from 'next/image';
import './styles.scss';
import Breadcrumb from '@presentational/molecules/Breadcrumb/Breadcrumb';
import Textarea from '@presentational/atoms/Textarea/Textarea';
import CheckoutSteps from '@presentational/molecules/CheckoutSteps/CheckoutSteps';
import { useEffect, useRef, useState } from 'react';
import { useNotification } from '@presentational/molecules/Notification/Notification';
import { ICartItem } from '@modules/services/entities';
import CommonLoader from '@presentational/atoms/CommonLoader/CommonLoader';
import Empty from '@presentational/atoms/Empty/Empty';
import { useRouter } from 'next/navigation';
import { PAGE_URLS } from '@constants/pages';
import { useGetCoupon } from '@modules/business-logic/lib/coupon';
import { useFullscreenLoaderController } from '@presentational/molecules/FullScreenLoader/FullScreenLoader';

type cartPricingDetailType = {
  products: number | null;
  thenewdawnSuperCoupon: number | null;
  coupon: number | null;
  total: number | null;
};
const defaultCPD = {
  products: null,
  thenewdawnSuperCoupon: null,
  coupon: null,
  total: null,
};
const vietnameseSale = 0.05;
export default function Cart() {
  const cartItemList = useGetCartItems();
  const [selectedItems, setSelectedItems] = useState<number[] | null>(null);
  const [couponInputValue, setCouponInputValue] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number | null>(null);
  const noteInputValueRef = useRef<string>('');
  const [cartPricingDetail, setCartPricingDetail] =
    useState<cartPricingDetailType>(defaultCPD);
  const [productTotal, setProductTotal] = useState<number | null>(null);
  const { onAddToCart } = useAddToCart();
  const { onDecreaseItem, onDeleteItem } = useDeleteFromCart();
  const { showError, showSuccess } = useNotification();
  const { onGetCoupon } = useGetCoupon();
  const router = useRouter();
  const { showLoader, hideLoader } = useFullscreenLoaderController();

  // Methods
  const handleAddCoupon = (e: any) => {
    e.preventDefault();
    if (couponInputValue.length === 0) {
      showError('Không được để trống');
      return;
    }
    showLoader();
    onGetCoupon({ coupon: couponInputValue })
      .then((data) => {
        showSuccess(data.message);
        setCouponDiscount(data.couponDiscount);
      })
      .catch((error) => showError(error.message))
      .finally(() => {
        hideLoader();
      });
  };

  const handleDeleteItem = (cartItem: ICartItem) => {
    onDeleteItem(cartItem.item.productId)
      .then((msg) => {
        showSuccess(msg);
      })
      .catch((error) => showError(error.message));
  };

  const calcTotal = (
    productTotalPrice: number,
    ...discount: (number | null)[]
  ) => {
    let total = productTotalPrice;
    discount.forEach((d) => {
      if (d) {
        total -= productTotalPrice * d;
      }
    });
    return total;
  };

  // Hooks

  useEffect(() => {
    Array.isArray(cartItemList) &&
      setSelectedItems(cartItemList.map((cartItem) => cartItem.item.productId));
  }, [cartItemList]);

  useEffect(() => {
    if (Array.isArray(selectedItems) && Array.isArray(cartItemList)) {
      const productTotalPrice = cartItemList.reduce(
        (acc, item) =>
          selectedItems.includes(item.item.productId)
            ? acc + item.quantity * item.item.productPrice
            : acc,
        0
      );
      setCartPricingDetail({
        products: productTotalPrice,
        thenewdawnSuperCoupon: 0.05 * productTotalPrice,
        coupon: couponDiscount ? couponDiscount * productTotalPrice : null,
        total: calcTotal(productTotalPrice, 0.05, couponDiscount),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  useEffect(() => {
    if (couponDiscount) {
      setCartPricingDetail(
        cartPricingDetail.products
          ? {
              ...cartPricingDetail,
              coupon: couponDiscount * cartPricingDetail.products,
              total: cartPricingDetail.products
                ? calcTotal(cartPricingDetail.products, 0.05, couponDiscount)
                : null,
            }
          : defaultCPD
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponDiscount]);

  return (
    <>
      <main className="cart-wrapper">
        <div className="container">
          <div className="breadcrumb__container">
            <Breadcrumb />
          </div>
          <div className="cart">
            <CheckoutSteps curStep="cart" />
            {typeof cartItemList === 'undefined' ? (
              <div className="cart__loader">
                <CommonLoader customSize={35} />
              </div>
            ) : cartItemList === null ||
              (Array.isArray(cartItemList) && cartItemList.length === 0) ? (
              <div className="cart__empty">
                <Empty
                  customSize={60}
                  customFontSize="0.75rem"
                  label="Không có gì trong giỏ hàng hết!"
                />
                <div className="empty__navigation-btn">
                  <CommonButton
                    style="modern-onlyBorder"
                    onClick={() => {
                      router.push(PAGE_URLS.SHOP);
                    }}
                  >
                    Tới cửa hàng
                  </CommonButton>
                </div>
              </div>
            ) : (
              <>
                <div className="cart__items">
                  <h3>Giỏ hàng</h3>
                  <div className="items-wrapper">
                    {cartItemList.map((cartItem) => (
                      <div className="item" key={cartItem.item.productId}>
                        <Checkbox
                          label=""
                          name={`cart_item@${cartItem.item.productId}`}
                          defaultChecked={selectedItems?.includes(
                            cartItem.item.productId
                          )}
                          onCheck={(name, value) => {
                            const itemId = cartItem.item.productId;
                            if (!Array.isArray(selectedItems)) {
                              setSelectedItems([itemId]);
                            } else if (selectedItems.includes(itemId)) {
                              setSelectedItems(
                                selectedItems.filter((id) => id !== itemId)
                              );
                            } else {
                              setSelectedItems([...selectedItems, itemId]);
                            }
                          }}
                        />
                        <div className="item__img">
                          <Image
                            src={cartItem.item.productThumbnail}
                            alt={cartItem.item.productName}
                            width={100}
                            height={100}
                          />
                          <CommonButton
                            style="none"
                            loading={false}
                            onClick={() => {
                              handleDeleteItem(cartItem);
                            }}
                          >
                            <p>
                              <i className="fi fi-rs-trash"></i>Xoá
                            </p>
                          </CommonButton>
                        </div>
                        <div className="item__info">
                          <h3>{cartItem.item.productName}</h3>
                          <div className="info__quantity">
                            <p>Số lượng:</p>
                            <Quantity
                              quantity={cartItem.quantity}
                              onChangeQuantity={(quantity: number) => {
                                if (quantity >= 0) {
                                  if (quantity > cartItem.quantity) {
                                    onAddToCart(
                                      {
                                        item: cartItem.item,
                                        quantity: quantity - cartItem.quantity,
                                      },
                                      true
                                    )
                                      .then((msg) => showSuccess(msg))
                                      .catch((error) =>
                                        showError(error.message)
                                      );
                                  } else if (quantity < cartItem.quantity) {
                                    onDecreaseItem({
                                      productId: cartItem.item.productId,
                                      quantity: cartItem.quantity - quantity,
                                    })
                                      .then((msg) => showSuccess(msg))
                                      .catch((error) =>
                                        showError(error.message)
                                      );
                                  }
                                }
                              }}
                            />
                          </div>
                          <strong>
                            {onConvertNumberToCurrency(
                              cartItem.item.productPrice * cartItem.quantity
                            )}
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="items__note">
                    <Textarea
                      name="note"
                      id="cart-note"
                      label="Ghi chú đơn hàng..."
                      onChange={(value) =>
                        (noteInputValueRef.current = value.trim())
                      }
                    />
                  </div>
                </div>
                <div className="cart__total">
                  <div className="total__wrapper">
                    <div className="row">
                      <p>Sản phẩm:</p>
                      <p className="price">
                        {cartPricingDetail.products
                          ? onConvertNumberToCurrency(
                              cartPricingDetail.products
                            )
                          : 'Đang tính...'}
                      </p>
                    </div>
                    <div className="row">
                      <p>Đặc quyền người Việt:</p>
                      <p className="discount">
                        {cartPricingDetail.thenewdawnSuperCoupon
                          ? onConvertNumberToCurrency(
                              cartPricingDetail.thenewdawnSuperCoupon
                            )
                          : 'Đang tính...'}
                      </p>
                    </div>
                    {couponDiscount ? (
                      <div className="row">
                        <p>Mã giảm giá:</p>
                        <p className="discount">
                          {cartPricingDetail.coupon
                            ? onConvertNumberToCurrency(
                                cartPricingDetail.coupon
                              )
                            : 'Đang tính...'}
                        </p>
                      </div>
                    ) : (
                      <form
                        className="total__add-coupon"
                        onSubmit={handleAddCoupon}
                      >
                        <label
                          htmlFor="coupon"
                          className={
                            couponInputValue.length === 0 ? 'active' : ''
                          }
                        >
                          Mã giảm giá...
                        </label>
                        <input
                          type="text"
                          id="coupon"
                          onChange={(e) =>
                            setCouponInputValue(e.target.value.trim())
                          }
                        />
                        <button type="submit">
                          <i className="fi fi-br-check"></i>
                        </button>
                      </form>
                    )}
                    <div className="row">
                      <h3>Tạm tính:</h3>
                      <strong>
                        {cartPricingDetail.total
                          ? onConvertNumberToCurrency(cartPricingDetail.total)
                          : 'Đang tính...'}
                      </strong>
                    </div>
                    <div className="row policy">
                      <p>
                        Chưa tính phí giao hàng{' '}
                        <b>(Miễn phí nếu bạn ở thành phố Hồ Chí Minh)</b>
                      </p>
                    </div>
                  </div>
                  <div className="checkout-btn">
                    <CommonButton style="soft-fill" onClick={() => {}}>
                      THANH TOÁN
                    </CommonButton>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
