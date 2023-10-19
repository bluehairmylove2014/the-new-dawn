import Image from "next/image";
import { CommonButton } from "../../atoms/CommonButton/CommonButton";
import { IProduct } from "@/modules/services/entities";
import "./styles.scss";
import { useConvertCurrency } from "@/modules/business-logic/lib/currency/process/hooks/useConvertCurrency";
import Link from "next/link";
import { PAGE_URLS } from "@/constants/pages";
import { calculateDiscountedPrice } from "@/utils/helpers";
import { useAddToCart } from "@/modules/business-logic/lib/cart";
import { useNotification } from "../Notification/Notification";

type SIZE = "small" | "medium" | "large";
const ProductCard = ({
  productData,
  size,
  autoFill,
}: {
  productData: IProduct;
  size?: SIZE;
  autoFill?: boolean;
}) => {
  const { onConvertNumberToCurrency } = useConvertCurrency();
  const { onAddToCart, isLoading } = useAddToCart();
  const { showError, showSuccess } = useNotification();
  const handleAddToCart = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart({ item: productData, quantity: 1 })
      .then((msg) => showSuccess(msg))
      .catch((error) => showError(error.message));
  };

  return productData ? (
    <Link
      prefetch={true}
      href={PAGE_URLS.PRODUCT + "/" + productData.id}
      className={`product-card ${size ? size : "medium"} ${
        autoFill ? "fill" : ""
      }`}
    >
      <div className="card__header">
        <div className="card__image">
          <Image
            src={productData.thumbnail}
            alt={productData.name}
            fill
            priority
          />
        </div>
        <h4>{productData.name}</h4>
      </div>
      <div className="card__body">
        <div className="card__features">
          {productData.features.map((feat) => (
            <p key={productData.id + feat}>
              <i className="fi fi-br-rocket-lunch"></i>
              {feat}
            </p>
          ))}
        </div>
      </div>
      <div className="card__footer">
        <div className="card__price-cart">
          {productData.discount > 0 ? (
            <p>
              {onConvertNumberToCurrency(
                calculateDiscountedPrice(
                  productData.price,
                  productData.discount
                ).amountToPay
              )}
              <small>{onConvertNumberToCurrency(productData.price)}</small>
            </p>
          ) : (
            <p>{onConvertNumberToCurrency(productData.price)}</p>
          )}
          {/* {size && size === "small" ? (
            <></>
          ) : (
            <CartButton product={productData} onClick={handleAddToCart} />
          )} */}
        </div>
        <div className="card__buy">
          <CommonButton
            style="modern-fill"
            onClick={handleAddToCart}
            loading={isLoading}
          >
            Thêm vào giỏ hàng
          </CommonButton>
        </div>
        {/* {size && size === "small" ? (
          <></>
        ) : (
          <div className="card__buy">
            <CommonButton style="modern-fill">Thêm vào giỏ hàng</CommonButton>
          </div>
        )} */}
      </div>
    </Link>
  ) : (
    <></>
  );
};

export default ProductCard;
