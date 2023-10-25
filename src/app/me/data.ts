import UserDetail from "@/components/organisms/UserDetail/UserDetail";

export type tabType = {
  component: () => JSX.Element;
  labelIcon: string;
  label: string;
  key: string;
};
export const tabs: tabType[] = [
  {
    component: UserDetail,
    labelIcon: "fi fi-sr-user-crown",
    label: "Thông tin tài khoản",
    key: "USER_DETAIL",
  },
  {
    component: UserDetail,
    labelIcon: "fi fi-sr-address-book",
    label: "Sổ địa chỉ",
    key: "ADDRESS",
  },
  {
    component: UserDetail,
    labelIcon: "fi fi-ss-box",
    label: "Đơn hàng của bạn",
    key: "ORDER",
  },
  {
    component: UserDetail,
    labelIcon: "fi fi-sr-lock",
    label: "Đổi mật khẩu",
    key: "CHANGE_PASSWORD",
  },
];
