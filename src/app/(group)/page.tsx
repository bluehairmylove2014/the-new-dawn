"use client";

import Image from "next/image";
import "./styles.scss";
import { CommonButton } from "@/components/atoms/CommonButton/CommonButton";
import { IProduct } from "@/modules/services/entities";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";

import guideStepIcon1 from "@/assets/icons/login.png";
import guideStepIcon2 from "@/assets/icons/power.png";
import guideStepIcon3 from "@/assets/icons/touch.png";
import Icon from "@/components/atoms/Icon/Icon";
import { useRouter } from "next/navigation";
import { PAGE_URLS } from "@/constants/pages";
import { useIsLogged } from "@/modules/business-logic/lib/auth";

export default function Home() {
  const products: IProduct[] = [
    {
      id: "19057grtbeukfa198",
      image:
        "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/image-removebg-preview_(2)-gUcXQLCDx-transformsad%C3%A1%C4%91aed.png",
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
        "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/product%202.png",
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
      image:
        "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/product-1.png",
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
  const router = useRouter();
  const isLoggedIn = useIsLogged();
  return (
    <main className="home">
      <section className="introduction__wrapper">
        <div className="introduction container">
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
                <CommonButton
                  style="modern-fill"
                  onClick={() => {
                    router.push(PAGE_URLS.SHOP);
                  }}
                >
                  Đến cửa hàng
                </CommonButton>
              </div>
              <div className="button-wrapper__app">
                <CommonButton
                  style="none"
                  onClick={() => {
                    router.push(PAGE_URLS.APPLICATION);
                  }}
                >
                  Tải phần mềm
                </CommonButton>
              </div>
            </div>
          </div>
          <div className="introduction__graphics">
            <Image
              src={
                "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/product.png"
              }
              alt="helios clock"
              fill
              priority
            />
          </div>
        </div>
      </section>
      <section className="hot-products">
        <h2>SẢN PHẨM NỔI BẬT</h2>
        <div className="hot-products__list container">
          {products.map((p) => (
            <ProductCard key={p.id} productData={p} />
          ))}
        </div>
      </section>
      <section className="guide container">
        <h2>Dễ dàng sử dụng!</h2>
        <div className="guide__steps">
          <div className="step">
            <Icon
              media={guideStepIcon1}
              alt="guide-login"
              customWidth={100}
              customHeight={100}
            />
            <h3>Đăng nhập</h3>
            <p>Đăng nhập bằng tài khoản Google hoặc đăng ký ngay</p>
          </div>
          <div className="step">
            <Icon
              media={guideStepIcon2}
              alt="guide-login"
              customWidth={100}
              customHeight={100}
            />
            <h3>Kích hoạt thiết bị</h3>
            <p>
              Khi mua sản phẩm, phía sau có mã ID. Dùng ID đó để kích hoạt thiết
              bị
            </p>
          </div>
          <div className="step">
            <Icon
              media={guideStepIcon3}
              alt="guide-login"
              customWidth={100}
              customHeight={100}
            />
            <h3>Sử dụng ngay!</h3>
            <p>
              Bạn có thể tải phần mềm để quản lý thiết bị hoặc dùng trực tiếp
              trên web
            </p>
          </div>
        </div>
        <div className="guide__button-wrapper">
          <CommonButton
            style="modern-fill"
            onClick={() => {
              isLoggedIn
                ? router.push(PAGE_URLS.ACTIVATE_DEVICE)
                : router.push(PAGE_URLS.AUTHENTICATION);
            }}
          >
            Bắt đầu ngay
          </CommonButton>
        </div>
      </section>
      <section className="information">
        <div className="information__article container">
          <div className="article__images--left">
            <div className="image">
              <Image
                src={
                  "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/yasin-hasan-Od3vrRKvPBk-unsplash.jpg"
                }
                alt="helios clock 1"
                fill
              />
            </div>
            <div className="image">
              <Image
                src={
                  "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/piggybank-pbsxykvExdM-unsplash.jpg"
                }
                alt="helios clock 2"
                fill
              />
            </div>
            <h3 className="images__sort-description">
              Miễn phí, hiện đại
              <br />& Tiện nghi
            </h3>
          </div>
          <div className="article__content--right">
            <strong>Phần mềm quản lý thiết bị</strong>
            <h2>Thoả sức sáng tạo không giới hạn</h2>
            <p>
              <b>
                Tự sáng tạo hoặc dùng các hình nền có sẵn, đổi mới không gian
                làm việc. Dự báo thời tiết, nhắc nhở, phát nhạc, có trợ lý ảo
                trả lời 24/24 và hơn thế nữa.
              </b>
            </p>
            <p>
              Có phần mềm quản lý chuyên dụng, hoặc sử dụng trực tiếp trên
              website. Bảo mật và tiện lợi!
            </p>
            <div className="content__action-button">
              <CommonButton
                style="modern-fill"
                onClick={() => {
                  router.push(PAGE_URLS.APPLICATION);
                }}
              >
                Xem sản phẩm
              </CommonButton>
            </div>
          </div>
        </div>
        <div className="information__article container">
          <div className="article__content--left">
            <strong>GIẢM 5% nếu bạn là người Việt Nam!</strong>
            <h2>Tự tin dùng hàng Việt</h2>
            <p>
              <b>
                Có thể đổi mới hoàn toàn trong tuần đầu sử dụng nếu có lỗi từ
                phía shop! Bảo hành, sửa chữa miễn phí 6 tháng đầu sử dụng.
              </b>
            </p>
            <p>
              Một lượt ủng hộ của bạn sẽ góp phần đưa công nghệ Việt đi xa và
              phát triển hơn trong tương lai.
            </p>
            <div className="content__action-button">
              <CommonButton
                style="modern-fill"
                onClick={() => {
                  router.push(PAGE_URLS.SHOP);
                }}
              >
                Đến cửa hàng
              </CommonButton>
            </div>
          </div>
          <div className="article__images--right">
            <div className="image">
              <Image
                src={
                  "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/minh-pham-3s9s0sY666A-unsplash.jpg"
                }
                alt="vietnam 1"
                fill
              />
            </div>
            <div className="image">
              <Image
                src={
                  "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/jet-dela-cruz-6p2AkWAIC8E-unsplash.jpg"
                }
                alt="vietnam 2"
                fill
              />
            </div>
            <h3 className="images__sort-description">
              Người Việt dùng
              <br />
              hàng Việt
            </h3>
          </div>
        </div>
      </section>
    </main>
  );
}
