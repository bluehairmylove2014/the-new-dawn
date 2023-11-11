import React from "react";
import { useContext } from "react";
import { CartContextType } from "./type";

export const CartContext = React.createContext<CartContextType>({
  state: { 
    cart: null,
    accessToken: null
  },
  dispatch: () => undefined
});

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
