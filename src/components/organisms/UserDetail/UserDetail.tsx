"use client";
import { useGetUser } from "@/modules/business-logic/lib/user";
import "./styles.scss";
import { CommonButton } from "@/components/atoms/CommonButton/CommonButton";
import CommonLoader from "@/components/atoms/CommonLoader/CommonLoader";
import CircleImage from "@/components/atoms/CircleImage/CircleImage";
import AuthInput from "@/components/atoms/AuthInput/AuthInput";
import { useForm } from "react-hook-form";
import { useNotification } from "@/components/molecules/Notification/Notification";

type formDataType = {
  email: string;
  fullName: string;
  phoneNumber: string;
  country: string | null;
  province: string | null;
  ward: string | null;
  district: string | null;
  streetAddress: string | null;
};
const UserDetail = () => {
  const userData = useGetUser();
  console.log(userData);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: userData?.email || "",
      fullName: userData?.fullName || "",
      phoneNumber: userData?.phoneNumber || "Trống",
      country: userData?.country || "Trống",
      province: userData?.province || "Trống",
      ward: userData?.ward || "Trống",
      district: userData?.district || "Trống",
      streetAddress: userData?.streetAddress || "Trống",
    },
  });
  const { showReactHookFormError, showSuccess } = useNotification();

  // Methods
  const handleChangeProfile = (data: formDataType) => {
    console.log(data);
    showSuccess("SUCCESS");
  };
  const handleSubmitError = (error: any) => {
    showReactHookFormError(error);
  };

  return (
    <div className="user-detail">
      <h3>Thông tin cá nhân</h3>

      <div className="user-detail__wrapper">
        <div className="user-detail__avatar">
          {userData ? (
            <CircleImage
              src={userData.avatar}
              alt={userData.fullName}
              size={"150px"}
            />
          ) : (
            <CommonLoader />
          )}
          <div className="avatar__edit-btn">
            <CommonButton style="soft-fill">Chỉnh sửa</CommonButton>
          </div>
        </div>
        <form
          className="user-detail__info"
          onSubmit={handleSubmit(handleChangeProfile, handleSubmitError)}
        >
          <AuthInput
            name={"email"}
            label={"Email"}
            type="email"
            control={control}
            rules={{ required: "Email không được để trống" }}
            onChange={() => {}}
          />
          <AuthInput
            name={"fullName"}
            label={"Họ và tên"}
            type="text"
            control={control}
            rules={{ required: "Tên không được để trống" }}
            onChange={() => {}}
          />
          <AuthInput
            name={"phoneNumber"}
            label={"Số điện thoại"}
            type="text"
            control={control}
            rules={{}}
            onChange={() => {}}
          />
          <AuthInput
            name={"country"}
            label={"Quốc gia"}
            type="text"
            control={control}
            rules={{}}
            onChange={() => {}}
          />
          <AuthInput
            name={"province"}
            label={"Tỉnh / Thành phố"}
            type="text"
            control={control}
            rules={{}}
            onChange={() => {}}
          />
          <AuthInput
            name={"district"}
            label={"Quận / Huyện"}
            type="text"
            control={control}
            rules={{}}
            onChange={() => {}}
          />
          <AuthInput
            name={"ward"}
            label={"Phường / Xã"}
            type="text"
            control={control}
            rules={{}}
            onChange={() => {}}
          />
          <AuthInput
            name={"streetAddress"}
            label={"Địa chỉ"}
            type="text"
            control={control}
            rules={{}}
            onChange={() => {}}
          />
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
