import Image from "next/image";
import CartButton from "../atoms/CartButton";
import { CommonButton } from "../atoms/CommonButton";
import { convertNumberToCurrency } from "@/utils/helpers";
import { IProduct } from "@/modules/services/entities";
import "./styles.scss";

const ProductCard = ({ productData }: { productData: IProduct }) => {
  const handleAddToCart = (product: IProduct) => {
    // TODO
  };
  return productData ? (
    <div className="product-card">
      <div className="card__body">
        <h4>{productData.name}</h4>
        <div className="card__image">
          <Image src={productData.image} alt={productData.name} fill />
        </div>
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
          <p>{convertNumberToCurrency("VND", productData.price)}</p>
          <CartButton product={productData} onClick={handleAddToCart} />
        </div>
        <div className="card__buy">
          <CommonButton style="modern-fill">Mua ngay</CommonButton>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ProductCard;
