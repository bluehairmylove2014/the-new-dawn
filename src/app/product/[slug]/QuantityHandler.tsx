"use client";
import Quantity from "@/components/molecules/Quantity/Quantity";
import React, { useEffect, useState } from "react";
import BuyButton from "./BuyButton";
import AddToCartButton from "./AddToCartButton";
import { IProduct, IProductDetail } from "@/modules/services/entities";

const QuantityHandler = ({ productData }: { productData: IProductDetail }) => {
  const [qty, setQty] = useState<number>(1);
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (productData) {
      const { images, specifications, details, ...newProduct } = productData;
      setProduct(newProduct);
    }
  }, [productData]);

  return (
    <>
      <div className="content__quantity">
        <p>Số lượng:</p>
        <Quantity
          quantity={qty}
          onChangeQuantity={(quantity: number) => {
            if (quantity >= 0) {
              setQty(quantity);
            }
          }}
        />
      </div>
      {!product || product.outOfStock ? (
        <></>
      ) : (
        <div className="content__interact-wrapper">
          <div className="button-wrapper">
            <BuyButton product={product} quantity={qty} />
          </div>
          <div className="button-wrapper">
            <AddToCartButton product={product} quantity={qty} />
          </div>
        </div>
      )}
    </>
  );
};

export default QuantityHandler;
