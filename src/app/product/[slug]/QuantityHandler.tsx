"use client";
import Quantity from "@/components/molecules/Quantity/Quantity";
import { useState } from "react";

const QuantityHandler = () => {
  const [quantityValue, setQuantityValue] = useState<number>(1);
  return (
    <>
      <p>Số lượng:</p>
      <Quantity
        quantity={quantityValue}
        onChangeQuantity={(quantity: number) => {
          if (quantity >= 0) {
            setQuantityValue(quantity);
          }
        }}
      />
    </>
  );
};

export default QuantityHandler;
