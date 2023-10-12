import { getProductUrl } from "../../config/apis";
import { Services } from "../../service";
import { getProductResponseSchema } from "./schema";
import { getProductParams, getProductResponse } from "./type";

export * from "./type";
export class ProductService extends Services {
  abortController?: AbortController;

  getProduct = async ({
    productId,
  }: getProductParams): Promise<getProductResponse> => {
    this.abortController = new AbortController();
    try {
      if (typeof productId === "string" && productId.length > 0) {
        const response = await this.fetchApi<
          typeof getProductResponseSchema,
          getProductResponse
        >({
          method: "GET",
          url: getProductUrl,
          schema: getProductResponseSchema,
          params: {
            productId,
          },
          signal: this.abortController.signal,
          transformResponse: (res) => res,
        });
        return response;
      } else {
        throw new Error("Invalid product ID");
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
