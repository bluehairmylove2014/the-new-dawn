"use client";
import Breadcrumb from "@/components/molecules/Breadcrumb/Breadcrumb";
import "./styles.scss";
import { CommonButton } from "@/components/atoms/CommonButton/CommonButton";
import { tabs } from "./data";
import React, { useState } from "react";

const initialTab = Object.keys(tabs)[0];
const Me = () => {
  const [selectedTab, setSelectedTab] = useState<string>(initialTab);

  return (
    <main className="me-wrapper container">
      <Breadcrumb />
      <div className="me">
        <nav className="me__tabs">
          <ul>
            <li>
              <CommonButton
                style="none"
                onClick={() => setSelectedTab(tabs.USER_DETAIL.label)}
              >
                Thông tin cá nhân
              </CommonButton>
            </li>
            <li>
              <CommonButton
                style="none"
                onClick={() => setSelectedTab(tabs.ORDER.label)}
              >
                Đơn hàng của bạn
              </CommonButton>
            </li>
            <li>
              <CommonButton
                style="none"
                onClick={() => setSelectedTab(tabs.CHANGE_PASSWORD.label)}
              >
                Đổi mật khẩu
              </CommonButton>
            </li>
          </ul>
        </nav>
        <div className="me__content">
          {React.createElement(tabs[selectedTab].component)}
        </div>
      </div>
    </main>
  );
};

export default Me;
