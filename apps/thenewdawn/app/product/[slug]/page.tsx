import './styles.scss';
import Breadcrumb from '@presentational/molecules/Breadcrumb/Breadcrumb';
import { ProductService } from '@modules/services';
import {
  calculateDiscountedPrice,
  onConvertNumberToCurrency,
} from '@utils/helpers';
import ProductGallery from '@presentational/molecules/ProductGallery/ProductGallery';
import React from 'react';
import { detailsType } from '@modules/services/entities';
import Image from 'next/image';
import QuantityHandler from './QuantityHandler';

const productService = new ProductService();
const Product = async ({ params }: { params: { slug: string } }) => {
  const productData = await productService.getProduct({
    productId: params.slug,
  });
  // Methods
  const generateProductDetails = (details: detailsType) => {
    return Array.isArray(details) ? (
      details.map((pd, index) => {
        if (pd.productDetailTag === 'img') {
          return (
            <div className="details__img" key={`img@${index}`}>
              <Image src={pd.productDetailSrc} alt={pd.productDetailAlt} fill />
            </div>
          );
        } else {
          return React.createElement(
            pd.productDetailTag,
            { key: `non-img@${index}` },
            pd.productDetailChildren
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
            <div className="breadcrumb__container">
              <Breadcrumb />
            </div>
            <div className="product__overview">
              <div className="overview__images">
                <ProductGallery images={productData.productImages} />
              </div>
              <div className="overview__content">
                <strong>
                  Giảm tới 5% nếu bạn là người Việt{' '}
                  {/* <CustomLink href={PAGE_URLS.HOME}>
                  Hướng dẫn xác minh
                </CustomLink> */}
                </strong>
                <h1>Đồng hồ thông minh HELIOS PRO</h1>
                <small
                  className={productData.productStock === 0 ? 'out' : 'on'}
                >
                  Tình trạng:{' '}
                  {productData.productStock === 0 ? 'Hết hàng' : 'Còn hàng'}
                </small>

                <div className="content__price">
                  {productData.productDiscount > 0 ? (
                    <>
                      <p>
                        {onConvertNumberToCurrency(
                          calculateDiscountedPrice(
                            productData.productPrice,
                            productData.productDiscount
                          ).amountToPay
                        )}
                        <span>
                          {onConvertNumberToCurrency(
                            calculateDiscountedPrice(
                              productData.productPrice,
                              productData.productDiscount
                            ).discountedPrice +
                              calculateDiscountedPrice(
                                productData.productPrice,
                                productData.productDiscount
                              ).amountToPay
                          )}
                        </span>
                      </p>
                      <div className="price__sale">
                        - {productData.productDiscount * 100} %
                      </div>
                    </>
                  ) : (
                    <p>{onConvertNumberToCurrency(productData.productPrice)}</p>
                  )}
                </div>
                <QuantityHandler productData={{ ...productData }} />

                <div className="content__feature">
                  {productData.productFeatures.map((pf) => (
                    <p key={`feature@${pf.featureId}`}>
                      <i className="fi fi-ss-flame"></i>&nbsp;
                      {pf.featureName}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="product__detail">
              <div className="detail__features">
                {productData ? (
                  generateProductDetails(productData.productDetails)
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
                    {productData.productSpecifications.map((spec, index) => (
                      <tr key={index}>
                        <td>{spec.productSpecificationName}</td>
                        <td>{spec.productSpecificationDetail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
