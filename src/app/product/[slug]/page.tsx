import "./styles.scss";
import Breadcrumb from "@/components/molecules/Breadcrumb/Breadcrumb";
import { ProductService } from "@/modules/services";
import {
  calculateDiscountedPrice,
  onConvertNumberToCurrency,
} from "@/utils/helpers";
import BuyButton from "./BuyButton";
import AddToCartButton from "./AddToCartButton";
import ProductGallery from "@/components/molecules/ProductGallery/ProductGallery";
import PoliciesBar from "@/components/molecules/PoliciesBar/PoliciesBar";
import React from "react";
import { detailsType } from "@/modules/services/entities";
import Image from "next/image";
import QuantityHandler from "./QuantityHandler";

const productService = new ProductService();
const Product = async ({ params }: { params: { slug: string } }) => {
  const productData = await productService.getProduct({
    productId: params.slug,
  });

  // Methods
  const generateProductDetails = (details: detailsType) => {
    return Array.isArray(details) ? (
      details.map((pd, index) => {
        if (pd.tag === "img") {
          return (
            <div className="details__img" key={`img@${index}`}>
              <Image src={pd.src} alt={pd.alt} fill />
            </div>
          );
        } else {
          return React.createElement(
            pd.tag,
            { key: `non-img@${index}` },
            pd.children
          );
        }
      })
    ) : (
      <></>
    );
  };

  return (
    <main className="product">
      {productData ? (
        <>
          <div className="container">
            <Breadcrumb />
          </div>
          <div className="product__overview container">
            <div className="overview__images">
              <ProductGallery images={productData.images} />
            </div>
            <div className="overview__content">
              <strong>
                Giảm tới 5% nếu bạn là người Việt{" "}
                {/* <CustomLink href={PAGE_URLS.HOME}>
                  Hướng dẫn xác minh
                </CustomLink> */}
              </strong>
              <h1>Đồng hồ thông minh HELIOS PRO</h1>
              <small className={productData.outOfStock ? "out" : "on"}>
                Tình trạng: {productData.outOfStock ? "Hết hàng" : "Còn hàng"}
              </small>

              <div className="content__feature">
                {productData.features.map((pf, index) => (
                  <p key={`feature@${index}`}>
                    <i className="fi fi-br-caret-right"></i>&nbsp;{pf}
                  </p>
                ))}
              </div>

              <div className="content__price">
                {productData.discount > 0 ? (
                  <>
                    <p>
                      {onConvertNumberToCurrency(
                        calculateDiscountedPrice(
                          productData.price,
                          productData.discount
                        ).amountToPay
                      )}
                      <span>
                        {onConvertNumberToCurrency(
                          calculateDiscountedPrice(
                            productData.price,
                            productData.discount
                          ).discountedPrice
                        )}
                      </span>
                    </p>
                    <div className="price__sale">
                      - {productData.discount * 100} %
                    </div>
                  </>
                ) : (
                  <p>{onConvertNumberToCurrency(productData.price)}</p>
                )}
              </div>
              <div className="content__quantity">
                <QuantityHandler />
              </div>
              {productData.outOfStock ? (
                <></>
              ) : (
                <div className="content__interact-wrapper">
                  <div className="button-wrapper">
                    <BuyButton product={productData} />
                  </div>
                  <div className="button-wrapper">
                    <AddToCartButton product={productData} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="product__policy">
            <PoliciesBar style="minimize" />
          </div>
          <div className="product__detail container">
            <div className="detail__features">
              {productData ? (
                generateProductDetails(productData.details)
              ) : (
                <></>
              )}
            </div>
            <div className="detail__specifications">
              <h3>Thông số kỹ thuật</h3>
              <table>
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.specifications.map((spec, index) => (
                    <tr key={index}>
                      <td>{spec.name}</td>
                      <td>{spec.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </main>
  );
};

export default Product;
