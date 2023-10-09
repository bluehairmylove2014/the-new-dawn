"use client";

import { toggleClassNoListener } from "@/utils/helpers";
import { useEffect, useRef, useState } from "react";
import "./styles.scss";
// import successIcon from "@/assets/icons/success.png";
// import errorIcon from "@/assets/icons/error.png";
// import Image from "next/image";

export type notificationStatusType = "SUCCESS" | "ERROR";
export type notificationContentType = string;

let updateNotificationState: null | Function = null;
const defaultStatus = "SUCCESS";
// const statusIcon = {
//   SUCCESS: <Image src={successIcon} alt="success" width={20} height={20} />,
//   ERROR: <Image src={errorIcon} alt="success" width={20} height={20} />,
// };

const Notification = () => {
  const notificationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    updateNotificationState = (
      type: notificationStatusType,
      content: notificationContentType
    ) => {
      if (!notificationRef.current) return;
      const contradictoryClass: notificationStatusType =
        type === "SUCCESS" ? "ERROR" : "SUCCESS";
      if (notificationRef.current.classList.contains(contradictoryClass)) {
        notificationRef.current.classList.remove(contradictoryClass);
        notificationRef.current.classList.add(type);
      }
      notificationRef.current.innerHTML = content;
      toggleClassNoListener(notificationRef.current, "active");
      setTimeout(() => {
        notificationRef.current &&
          toggleClassNoListener(notificationRef.current, "active");
      }, 1500); // 1.5s
    };
  }, []);

  return (
    <div
      className={`notification ${defaultStatus}`}
      ref={notificationRef}
      id="global-notification"
    ></div>
  );
};

type useNotificationType = {
  showSuccess: (content: notificationContentType) => void;
  showError: (content: notificationContentType) => void;
};
export const useNotification = (): useNotificationType => {
  const showSuccess = (content: notificationContentType) => {
    updateNotificationState && updateNotificationState("SUCCESS", content);
  };
  const showError = (content: notificationContentType) => {
    console.log("SHOW NOTIFICATION: ", updateNotificationState);
    updateNotificationState && updateNotificationState("ERROR", content);
  };
  return {
    showSuccess,
    showError,
  };
};

export default Notification;
