"use client"
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import { useGetHotProduct } from "@/modules/business-logic/lib/product";

const HotProductList = () => {
    const products = useGetHotProduct();
    return (
        <>
        <h2>SẢN PHẨM NỔI BẬT</h2>
        <div className="hot-products__list container">
          {Array.isArray(products) ? (
            products.map((p) => (
              <ProductCard key={p.productId} productData={p} />
            ))
          ) : (
            <></>
          )}
        </div></>
    );
}

export default HotProductList