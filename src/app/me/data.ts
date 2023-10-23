import UserDetail from "@/components/organisms/UserDetail/UserDetail";

export type tabsType = {
  [key: string]: {
    component: () => JSX.Element;
    label: string;
  };
};
export const tabs: tabsType = {
  USER_DETAIL: {
    component: UserDetail,
    label: "Thông tin cá nhân",
  },
  ORDER: {
    component: UserDetail,
    label: "Đơn hàng của bạn",
  },
  CHANGE_PASSWORD: {
    component: UserDetail,
    label: "Đổi mật khẩu",
  },
};
