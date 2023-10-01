"use client";
import Image from "next/image";
import "./styles.scss";
import { CommonButton } from "@/components/atoms/CommonButton";
import { IProduct } from "@/modules/services/entities";
import ProductCard from "@/components/molecules/ProductCard";

export default function Home() {
  const products: IProduct[] = [
    {
      id: "19057grtbeukfa198",
      image:
        "https://rialloer.sirv.com/the_new_dawn/products/image-removebg-preview_(2)-gUcXQLCDx-transformed.png",
      name: "Đồng hồ thông minh HELIOS thường",
      features: [
        "Thoải mái thay đổi hình nền",
        "Có dự báo thời tiết",
        "Màn hình FHD sắc nét",
        "Tích hợp loa cao cấp (nghe nhạc, xem phim)",
      ],
      price: 350000,
      discount: 0.125,
      outOfStock: false,
    },
    {
      id: "1923eukfa198",
      image:
        "https://rialloer.sirv.com/the_new_dawn/products/image-removebg-preview%20(1).png",
      name: "Đồng hồ thông minh HELIOS PRO",
      features: [
        "Có tất cả tính năng của bản thường",
        "Màn hình được nâng cấp rõ rệt",
        "Khung kim loại chắc chắn",
        "Tích hợp AI phản hồi và điều khuyển",
      ],
      price: 650000,
      discount: 0.235,
      outOfStock: false,
    },
    {
      id: "19015beukfa198",
      image: "https://rialloer.sirv.com/the_new_dawn/products/EMO.png",
      name: "Robo EMO thông minh",
      features: [
        "Tự động khám phá thế giới",
        "Giải trí cùng bạn mỗi ngày",
        "Tự nhận biết, nghe, nhìn và học hỏi",
        "Hỗ trợ bạn các công việc hằng ngày",
      ],
      price: 12000000,
      discount: 0,
      outOfStock: false,
    },
  ];

  return (
    <main>
      <section className="introduction">
        <div className="introduction__content">
          <small>
            <span>Giảm 5%</span> nếu bạn là người <span>Việt Nam!</span>
          </small>
          <h1>Nâng tầm góc làm việc của bạn</h1>
          <p>
            Hãy xem qua các sản phẩm công nghệ mới, tích hợp đa chức năng và
            được kết nối dung với hệ thống phần mềm quản lý đơn giản và dễ sử
            dụng.
          </p>
          <div className="content__button-wrapper">
            <div className="button-wrapper__shop">
              <CommonButton style="modern-onlyBorder" onClick={() => {}}>
                Đến cửa hàng
              </CommonButton>
            </div>
            <div className="button-wrapper__app">
              <CommonButton style="none" onClick={() => {}}>
                Tải phần mềm
              </CommonButton>
            </div>
          </div>
        </div>
        <div className="introduction__graphics">
          <Image
            src={
              "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/Untitled-ss2-transformed.png"
            }
            width={800}
            height={650}
            alt="helios clock"
            priority
          />
        </div>
      </section>
      <section className="hot-products">
        <div className="soft-peach-background"></div>
        <div className="hot-products__list">
          {products.map((p) => (
            <ProductCard key={p.id} productData={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
