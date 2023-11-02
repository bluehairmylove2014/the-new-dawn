'use client';

import Image from 'next/image';
import './styles.scss';

import Icon from '@presentational/atoms/Icon/Icon';
import { PAGE_URLS } from '../../../../libs/constants/pages';

import HotProductList from './HotProductList';
import StartGuideButton from './StartGuideButton';
import NavigateButton from '@presentational/atoms/NavigateButton/NavigateButton';

const guideStepIcon1 = '/assets/icons/login.png';
const guideStepIcon2 = '/assets/icons/power.png';
const guideStepIcon3 = '/assets/icons/touch.png';
const heliosGraphic = '/assets/graphics/helios.png';
const blogGraphic1 = '/assets/graphics/yasin-hasan-Od3vrRKvPBk-unsplash.jpg';
const blogGraphic2 = '/assets/graphics/piggybank-pbsxykvExdM-unsplash.jpg';
const blogGraphic3 = '/assets/graphics/minh-pham-3s9s0sY666A-unsplash.jpg';
const blogGraphic4 = '/assets/graphics/jet-dela-cruz-6p2AkWAIC8E-unsplash.jpg';

export default function Home() {
  return (
    <main className="home">
      <section className="introduction__wrapper">
        <div className="introduction container">
          <div className="introduction__content">
            <small>
              <span>Giảm tới 5%</span> nếu bạn là người <span>Việt Nam!</span>
            </small>
            <h1>Nâng tầm góc làm việc của bạn</h1>
            <p>
              Hãy xem qua các sản phẩm công nghệ mới, tích hợp đa chức năng và
              được kết nối cùng với hệ thống phần mềm quản lý đơn giản và dễ sử
              dụng.
            </p>
            <div className="content__button-wrapper">
              <div className="button-wrapper__shop">
                <NavigateButton
                  href={PAGE_URLS.SHOP}
                  style="modern-fill"
                  prefetching={true}
                >
                  Đến cửa hàng
                </NavigateButton>
              </div>
              <div className="button-wrapper__app">
                <NavigateButton
                  href={PAGE_URLS.APPLICATION}
                  style="modern-onlyBorder"
                >
                  Tải phần mềm
                </NavigateButton>
              </div>
            </div>
          </div>
          <div className="introduction__graphics">
            <Image src={heliosGraphic} alt="helios clock" fill priority />
          </div>
        </div>
      </section>
      <section className="hot-products">
        <HotProductList />
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
          <StartGuideButton />
        </div>
      </section>
      <section className="information">
        <div className="information__article container">
          <div className="article__images--left">
            <div className="image">
              <Image src={blogGraphic1} alt="helios clock 1" fill />
            </div>
            <div className="image">
              <Image src={blogGraphic2} alt="helios clock 2" fill />
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
              <NavigateButton href={PAGE_URLS.APPLICATION} style="modern-fill">
                Xem sản phẩm
              </NavigateButton>
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
              <NavigateButton href={PAGE_URLS.SHOP} style="modern-fill">
                Đến cửa hàng
              </NavigateButton>
            </div>
          </div>
          <div className="article__images--right">
            <div className="image">
              <Image src={blogGraphic3} alt="vietnam 1" fill />
            </div>
            <div className="image">
              <Image src={blogGraphic4} alt="vietnam 2" fill />
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
