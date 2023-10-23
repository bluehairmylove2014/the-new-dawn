"use client";
import Checkbox from "@/components/atoms/Checkbox/Checkbox";
import { CommonButton } from "@/components/atoms/CommonButton/CommonButton";
import Quantity from "@/components/molecules/Quantity/Quantity";
import {
  useAddToCart,
  useDeleteFromCart,
  useGetCartItems,
} from "@/modules/business-logic/lib/cart";
import { onConvertNumberToCurrency } from "@/utils/helpers";
import Image from "next/image";
import "./styles.scss";
import Breadcrumb from "@/components/molecules/Breadcrumb/Breadcrumb";
import Textarea from "@/components/atoms/Textarea/Textarea";
import CheckoutSteps from "@/components/molecules/CheckoutSteps/CheckoutSteps";
import { useState } from "react";
import { useNotification } from "@/components/molecules/Notification/Notification";
import { ICartItem } from "@/modules/services/entities";

export default function Cart() {
  const cartItemList = useGetCartItems();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [couponInputValue, setCouponInputValue] = useState<string>("");
  const [noteInputValue, setNoteInputValue] = useState<string>("");
  const productTotal = Array.isArray(cartItemList)
    ? cartItemList.reduce(
        (acc, item) => acc + item.quantity * item.item.productPrice,
        0
      )
    : null;
  const vietnameseSale = 0.05;
  const { onAddToCart, isLoading: isAdding } = useAddToCart();
  const {
    onDecreaseItem,
    onDeleteItem,
    isLoading: isDecreasing,
  } = useDeleteFromCart();
  const { showError, showSuccess } = useNotification();

  // Methods
  const handleAddCoupon = () => {
    //
  };

  const handleDeleteItem = (cartItem: ICartItem) => {
    setIsDeleting(true);
    onDeleteItem(cartItem.item.productId)
      .then((msg) => {
        showSuccess(msg);
      })
      .catch((error) => showError(error.message))
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <main className="cart-wrapper">
      <div className="container">
        <Breadcrumb />
        <div className="cart">
          <CheckoutSteps curStep="cart" />
          <div className="cart__items">
            <h3>Giỏ hàng</h3>
            <div className="items-wrapper">
              {Array.isArray(cartItemList) ? (
                cartItemList.map((cartItem) => (
                  <div
                    className={`item ${isDeleting ? "deleting" : ""}`}
                    key={cartItem.item.productId}
                  >
                    <Checkbox
                      label=""
                      name={`cart_item@${cartItem.item.productId}`}
                      onCheck={() => {}}
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
                                  .catch((error) => showError(error.message));
                              } else if (quantity < cartItem.quantity) {
                                onDecreaseItem({
                                  productId: cartItem.item.productId,
                                  quantity: cartItem.quantity - quantity,
                                })
                                  .then((msg) => showSuccess(msg))
                                  .catch((error) => showError(error.message));
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
                ))
              ) : (
                <></>
              )}
            </div>

            <div className="items__note">
              <Textarea
                name="note"
                id="cart-note"
                label="Ghi chú đơn hàng..."
                onChange={(value) => setNoteInputValue(value)}
              />
            </div>
          </div>
          <div className="cart__total">
            <div className="total__wrapper">
              <div className="row">
                <p>Sản phẩm:</p>
                <p className="price">
                  {productTotal
                    ? onConvertNumberToCurrency(productTotal)
                    : "Đang tính..."}
                </p>
              </div>
              <div className="row">
                <p>Đặc quyền người Việt:</p>
                <p className="discount">
                  {productTotal
                    ? onConvertNumberToCurrency(productTotal * vietnameseSale)
                    : "Đang tính..."}
                </p>
              </div>
              <form className="total__add-coupon" onSubmit={handleAddCoupon}>
                <label
                  htmlFor="coupon"
                  className={couponInputValue.length === 0 ? "active" : ""}
                >
                  Mã giảm giá...
                </label>
                <input
                  type="text"
                  id="coupon"
                  onChange={(e) => setCouponInputValue(e.target.value.trim())}
                />
                <button type="submit">
                  <i className="fi fi-br-check"></i>
                </button>
              </form>
              <div className="row">
                <h3>Tạm tính:</h3>
                <strong>
                  {productTotal
                    ? onConvertNumberToCurrency(
                        productTotal - productTotal * vietnameseSale
                      )
                    : "Đang tính..."}
                </strong>
              </div>
              <div className="row policy">
                <p>
                  Chưa tính phí giao hàng{" "}
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
        </div>
      </div>
    </main>
  );
}
