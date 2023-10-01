"use client";
import Image, { StaticImageData } from "next/image";
import "./styles.scss";
import Logo from "@/assets/logos/the_new_dawn_white.png";
import Link from "next/link";
import { pageUrls } from "@/constants/pages";
import { CommonButton } from "@/components/atoms/CommonButton";
import { NavDropdown } from "@/components/atoms/NavDropdown";
import { SimpleLoader } from "@/components/atoms/SimpleLoader";
import { languageOptions, moneyOptions } from "./StaticData";
import { useState } from "react";
import currencyIcon from "@/assets/icons/dollar.png";
import { useIsLogged } from "@/modules/business-logic/lib/auth";
import { RANK } from "@/constants/ranks";

const Header = () => {
  const isLoggedIn = useIsLogged();
  const [selectedCurrency, setSelectedCurrency] = useState(moneyOptions[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const userData = {
    id: "user001",
    name: "Nguyễn Ba Phương",
    email: "nbphuong@gmail.com",
    phoneNumber: "0337839146",
    address: "1264 Kha Vạn Cân, Linh Trung, Thủ Đức, Hồ Chí Minh",
    avatar:
      "https://rialloer.sirv.com/the_new_dawn/users/user001/avatar/minh-pham-3s9s0sY666A-unsplash.jpg",
    country: "vi",
    rank: "free",
  };

  // Methods
  const handleChangeLanguage = (value: string): void => {
    const selectLang = languageOptions.find((lo) => lo.value === value);
    selectLang && setSelectedLanguage(selectLang);
  };
  const handleChangeCurrency = (value: string): void => {
    const selectCur = moneyOptions.find((mo) => mo.value === value);
    selectCur && setSelectedCurrency(selectCur);
  };
  const getRankIcon = (rank: string): StaticImageData => {
    return RANK[
      `${
        (Object.keys(RANK).find(
          (r) => RANK[r as keyof typeof RANK].id === rank
        ) || "FREE") as keyof typeof RANK
      }`
    ].icon;
  };

  return (
    <header className="header">
      <div className="logo">
        <Image src={Logo} alt="the new dawn" />
      </div>
      <nav>
        <ul>
          <li>
            <NavDropdown
              options={languageOptions}
              onClick={handleChangeLanguage}
            >
              <p>
                <Image
                  src={selectedLanguage.flag}
                  alt="vietnam"
                  width={18}
                  height={18}
                />
                {selectedLanguage.name}
                <i className="fi fi-sr-caret-down"></i>
              </p>
            </NavDropdown>
          </li>
          <li>
            <NavDropdown options={moneyOptions} onClick={handleChangeCurrency}>
              <p>
                <Image src={currencyIcon} alt="money" width={18} height={18} />
                {selectedCurrency.name}
                <i className="fi fi-sr-caret-down"></i>
              </p>
            </NavDropdown>
          </li>
          <li className="nav__item--link">
            <Link href={pageUrls.GUIDE}>
              {/* <i className="fi fi-ss-box-open"></i> */}
              Hướng dẫn
            </Link>
          </li>
          <li className="nav__item--link">
            <Link href={pageUrls.ACTIVATE_DEVICE}>
              {/* <i className="fi fi-ss-box-open"></i> */}
              Kích hoạt thiết bị
            </Link>
          </li>
          <li className="nav__item--link">
            <Link href={pageUrls.PRODUCT}>
              {/* <i className="fi fi-ss-box-open"></i> */}
              Phần mềm
            </Link>
          </li>
          <li className="nav__item--link">
            <Link href={pageUrls.SHOP}>
              {/* <i className="fi fi-ss-basket-shopping-simple"> </i> */}
              Cửa hàng
            </Link>
          </li>
          {!isLoggedIn && userData ? (
            <li className="user">
              <Link href={pageUrls.PRICING} className="user__rank">
                <Image
                  src={getRankIcon(userData.rank)}
                  alt="rank"
                  width={30}
                  height={30}
                />
              </Link>
              <Link href={pageUrls.ME} className="user__avatar">
                <Image
                  src={userData.avatar}
                  alt="avatar"
                  width={40}
                  height={40}
                />
              </Link>
            </li>
          ) : userData === null ? (
            <li className="user">
              <Link href={pageUrls.ME} className="user__avatar">
                <SimpleLoader />
              </Link>
            </li>
          ) : (
            <li>
              <CommonButton style="fill">Đăng nhập</CommonButton>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
