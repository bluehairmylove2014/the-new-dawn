import { IProductDetail } from "../../entities";

export type getProductParams = {
  productId: string;
};
export type getProductResponse = IProductDetail | null;
