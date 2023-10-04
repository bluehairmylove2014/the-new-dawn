import Image from "next/image";
import "./styles.scss";

import policyIcon1 from "@/assets/icons/return.png";
import policyIcon2 from "@/assets/icons/guarantee.png";
import policyIcon3 from "@/assets/icons/card-payment.png";
import facebook from "@/assets/icons/facebook.png";
import tiktok from "@/assets/icons/tiktok.png";
import visa from "@/assets/icons/visa.png";
import momo from "@/assets/icons/momo-primary-logo/MoMo Primary Logo/png/momo_icon_square_pinkbg_RGB.png";
import cod from "@/assets/icons/shipment.png";
import Logo from "@/assets/logos/the_new_dawn_white_slogan.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__head">
        <div className="head__policies container">
          <div className="policy">
            <Image
              src={policyIcon1}
              alt="return policy"
              width={40}
              height={40}
            />
            <div className="policy__content">
              <h5>7 ngày đổi trả</h5>
              <p>Yên tâm mua sắm với chính sách đổi trả trong vòng 7 ngày</p>
            </div>
          </div>
          <div className="policy">
            <Image
              src={policyIcon2}
              alt="return policy"
              width={40}
              height={40}
            />
            <div className="policy__content">
              <h5>6 tháng bảo hành</h5>
              <p>6 tháng bảo hành miễn phí nếu có lỗi từ nhà sản xuất</p>
            </div>
          </div>
          <div className="policy">
            <Image
              src={policyIcon3}
              alt="return policy"
              width={40}
              height={40}
            />
            <div className="policy__content">
              <h5>Thanh toán dễ dàng</h5>
              <p>
                Đa dạng phương thức như COD, chuyển khoản (nội địa và quốc tế)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__body">
        <div className="footer-body__info container">
          <div className="info__logo">
            <Image src={Logo} alt="the new dawn" height={60} width={210} />
          </div>
          <div className="info__contact">
            <p>Thủ Đức, Hồ Chí Minh, Việt Nam</p>
            <p>(+84) 337 839 146 - thenewdawn@gmail.com</p>
          </div>
        </div>
        <div className="footer-body__links container">
          <div className="links__col">
            <h5>Thông tin công ty</h5>
            <Link href={"/"}>Về chúng tôi</Link>
          </div>
          <div className="links__col">
            <h5>Hỗ trợ khách hàng</h5>
            <Link href={"/"}>Chính sách bảo hành</Link>
            <Link href={"/"}>Phí vận chuyển</Link>
            <Link href={"/"}>Hướng dẫn đặt hàng</Link>
          </div>
          <div className="links__col">
            <h5>Sản phẩm</h5>
            <Link href={"/"}>Cửa hàng</Link>
            <Link href={"/"}>Ứng dụng quản lý</Link>
            <Link href={"/"}>Hướng dẫn sử dụng</Link>
          </div>
          <div className="links__col container">
            <h5>Kết nối với chúng tôi</h5>
            <div className="social-links">
              <Link href={"/"}>
                <Image src={facebook} alt="facebook" width={35} height={35} />
              </Link>
              <Link href={"/"}>
                <Image src={tiktok} alt="tiktok" width={35} height={35} />
              </Link>
            </div>
            <h6>Chúng tôi chấp nhận</h6>
            <div className="payment-methods">
              <Image src={visa} alt="visa" width={0} height={0}></Image>
              <Image src={momo} alt="momo" width={0} height={0}></Image>
              <Image src={cod} alt="cod" width={0} height={0}></Image>
            </div>
          </div>
        </div>
        <div className="footer-body__copyright  container">
          <h6>©2009-2023 The New Dawn bảo lưu tất cả các quyền</h6>
          <div className="details">
            <Link href={"/"}>Trung tâm bảo mật</Link>
            <p>|</p>
            <Link href={"/"}>Chính sách bảo mật & Cookie</Link>
            <p>|</p>
            <Link href={"/"}>Điều khoản & Điều kiện</Link>
            <p>|</p>
            <Link href={"/"}>Bản quyền</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
