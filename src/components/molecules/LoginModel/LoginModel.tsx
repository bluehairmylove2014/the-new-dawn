"use client";
import "./styles.scss";
import Image from "next/image";
import logo from "@/assets/logos/the_new_dawn.png";
import AuthInput, {
  authInputParams,
} from "@/components/atoms/AuthInput/AuthInput";
import { useForm } from "react-hook-form";
import { ValidateRegex } from "@/utils/validators/config";
import { CommonButton } from "@/components/atoms/CommonButton/CommonButton";
import Link from "next/link";
import { PAGE_URLS } from "@/constants/pages";
import Icon from "@/components/atoms/Icon/Icon";
import googleIcon from "@/assets/icons/search.png";
import { useNotification } from "../Notification/Notification";
import { useLogin } from "@/modules/business-logic/lib/auth";
import { useRouter } from "next/navigation";

const LoginModel = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const inputs: authInputParams[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      control: control,
      rules: {
        required: "Email không được để trống",
        pattern: {
          value: ValidateRegex.email,
          message: "Email không hợp lệ",
        },
      },
      onChange: (value: string) => {
        console.log(value);
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      control: control,
      rules: {
        required: "Mật khẩu không được để trống",
        pattern: {
          value: ValidateRegex.password,
          message: "Mật khẩu không hợp lệ",
        },
      },
      onChange: (value: string) => {
        console.log(value);
      },
    },
  ];
  const { onLogin, isLoading } = useLogin();
  const { showSuccess, showError } = useNotification();
  const router = useRouter();

  // Methods
  const handleSuccessSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    onLogin({ email, password })
      .then((msg) => {
        router.push(PAGE_URLS.HOME);
      })
      .catch((error) => {
        showError(error.message);
      });
  };
  const handleErrorSubmit = (errors: any) => {
    if (errors) {
      showError(errors[Object.keys(errors)[0]].message);
    }
  };

  return (
    <form
      className="login-model"
      onSubmit={handleSubmit(handleSuccessSubmit, handleErrorSubmit)}
    >
      <div className="login-model__logo">
        <Image src={logo} alt="the new dawn" fill />
      </div>

      {inputs.map((inp, index) => (
        <div
          className={`login-model__row ${
            index + 1 !== inputs.length ? "end-space" : ""
          }`}
          key={inp.name}
        >
          <AuthInput
            name={inp.name}
            label={inp.label}
            control={inp.control}
            type={inp.type}
            rules={inp.rules}
            onChange={inp.onChange}
          />
        </div>
      ))}

      <div className="login-model__row end-space">
        <Link href={PAGE_URLS.HOME}>Quên mật khẩu</Link>
      </div>

      <div className="login-model__button">
        <CommonButton style="soft-fill" type={"submit"} loading={isLoading}>
          Đăng nhập
        </CommonButton>
      </div>
      <small className="login-model__row ">Hoặc</small>
      <div className="login-model__button">
        <CommonButton style="soft-peach" onClick={() => {}}>
          <Icon
            media={googleIcon}
            alt="google login"
            customHeight={16}
            customWidth={16}
          />
          Đăng nhập với Google
        </CommonButton>
      </div>
      <div className="login-model__row center">
        <Link href={PAGE_URLS.REGISTER}>Chưa có tài khoản? Đăng ký ngay</Link>
      </div>
    </form>
  );
};

export default LoginModel;
