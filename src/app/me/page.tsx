"use client";
import Breadcrumb from "@/components/molecules/Breadcrumb/Breadcrumb";
import "./styles.scss";
import { CommonButton } from "@/components/atoms/CommonButton/CommonButton";
import { tabType, tabs } from "./data";
import React, { useState } from "react";
import { useLogout } from "@/modules/business-logic/lib/auth";
import { useRouter } from "next/navigation";
import { PAGE_URLS } from "@/constants/pages";

const initialTab = tabs[0];
const Me = () => {
  const [selectedTab, setSelectedTab] = useState<tabType>(initialTab);
  const { onLogout } = useLogout();
  const router = useRouter();

  return (
    <main className="me-wrapper container">
      <div className="breadcrumb__container">
        <Breadcrumb />
      </div>
      <div className="me">
        <nav className="me__tabs">
          <ul>
            {tabs.map((t) => (
              <li
                key={t.key}
                className={`${selectedTab.key === t.key ? "active" : ""}`}
              >
                <CommonButton style="none" onClick={() => setSelectedTab(t)}>
                  <i className={t.labelIcon}></i>
                  {t.label}
                </CommonButton>
              </li>
            ))}
            <li>
              <CommonButton
                style="none"
                onClick={() => {
                  onLogout();
                  router.push(PAGE_URLS.HOME);
                }}
              >
                <i className="fi fi-bs-power"></i>
                Đăng xuất
              </CommonButton>
            </li>
          </ul>
        </nav>
        <div className="me__content">
          {React.createElement(selectedTab.component)}
        </div>
      </div>
    </main>
  );
};

export default Me;
