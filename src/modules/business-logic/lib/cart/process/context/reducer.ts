import { CartAction, CartState } from ".";

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  try {
    switch (action.type) {
      case "SET_CART_ACTION":
        return {
          ...state,
          cart: action.payload,
        };
      case "SET_TOKEN_ACTION":
        return {
          ...state,
          accessToken: action.payload,
        };
      case "DELETE_ACTION":
        if (!state.cart?.items || !action.payload?.productId) return state;
        if (!action.payload.quantity) {
          // No quantity => Delete product
          state.cart.items = state.cart.items.filter(
            (p) => p.item.productId !== action.payload.productId
          );
          return {
            ...state,
          };
        }
        // Else decrease quantity
        state.cart.items = state.cart.items.map((p) => {
          if (
            p.item.productId === action.payload.productId &&
            action.payload.quantity
          ) {
            p.quantity -= action.payload.quantity;
          }
          return p;
        });
        return {
          ...state,
        };

      default:
        return state;
    }
  } catch (error) {
    console.error("Error in cartReducer: ", error);
    return state;
  }
};
