'use client';
import Quantity from '@presentational/molecules/Quantity/Quantity';
import React, { useEffect, useState } from 'react';
import BuyButton from './BuyButton';
import AddToCartButton from './AddToCartButton';
import { IProduct, IProductDetail } from '@modules/services/entities';

const QuantityHandler = ({ productData }: { productData: IProductDetail }) => {
  const [qty, setQty] = useState<number>(1);
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (productData) {
      const {
        productImages,
        productSpecifications,
        productDetails,
        ...newProduct
      } = productData;
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
            if (quantity > 0) {
              setQty(quantity);
            }
          }}
        />
      </div>
      {!product || product.productStock === 0 ? (
        <></>
      ) : (
        <div className="content__interact-wrapper">
          <div className="button-wrapper buy">
            <BuyButton product={product} quantity={qty} />
          </div>
          <div className="button-wrapper add-to-cart">
            <AddToCartButton product={product} quantity={qty} />
          </div>
        </div>
      )}
    </>
  );
};

export default QuantityHandler;
