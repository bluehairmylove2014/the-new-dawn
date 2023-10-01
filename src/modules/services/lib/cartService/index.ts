import {
  addToCartUrl,
  updateCartUrl,
  deleteFromCartUrl,
  decreaseItemQuantityUrl,
  clearCartUrl,
  getCartUrl,
} from "../../config/apis";
import { Services } from "../../service";
import { cartSchema, messageResponseSchema } from "./schema";
import {
  AddToCartParams,
  AddToCartResponse,
  ClearCartParams,
  ClearCartResponse,
  DecreaseItemQuantityParams,
  DeleteFromCartParams,
  DeleteFromCartResponse,
  GetCartParams,
  GetCartResponse,
  MessageResponse,
  UpdateCartParams,
  UpdateCartResponse,
} from "./type";

export * from "./type";
export class CartService extends Services {
  abortController?: AbortController;

  addToCart = async (params: AddToCartParams): Promise<AddToCartResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof messageResponseSchema,
        AddToCartResponse
      >({
        method: "POST",
        url: addToCartUrl,
        schema: messageResponseSchema,
        data: {
          item: params.item,
          quantity: params.quantity,
        },
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
  updateCart = async (
    params: UpdateCartParams
  ): Promise<UpdateCartResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof messageResponseSchema,
        UpdateCartResponse
      >({
        method: "PUT",
        url: updateCartUrl,
        schema: messageResponseSchema,
        data: {
          cart: params.cart,
        },
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
  deleteFromCart = async (
    params: DeleteFromCartParams
  ): Promise<DeleteFromCartResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof messageResponseSchema,
        DeleteFromCartResponse
      >({
        method: "DELETE",
        url: deleteFromCartUrl,
        schema: messageResponseSchema,
        params: {
          productId: params.productId,
        },
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
  decreaseItemQuantity = async (
    params: DecreaseItemQuantityParams
  ): Promise<MessageResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof messageResponseSchema,
        MessageResponse
      >({
        method: "DELETE",
        url: decreaseItemQuantityUrl,
        schema: messageResponseSchema,
        params: {
          productId: params.productId,
          quantity: params.quantity,
        },
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
  clearCart = async (params: ClearCartParams): Promise<ClearCartResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof messageResponseSchema,
        ClearCartResponse
      >({
        method: "DELETE",
        url: clearCartUrl,
        schema: messageResponseSchema,
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
  getCart = async (params: GetCartParams): Promise<GetCartResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<typeof cartSchema, GetCartResponse>({
        method: "GET",
        url: getCartUrl,
        schema: cartSchema,
        headers: {
          Authorization: `Bearer ${params}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
