import { ProductService } from "@/modules/services";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";

const productService = new ProductService();

export const useGetProductQuery = (productId: string) => {
  return useQuery([QUERY_KEYS.GET_PRODUCT], () =>
    productService.getProduct({ productId })
  );
};
