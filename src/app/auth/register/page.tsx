import LoginModel from "@/components/molecules/LoginModel/LoginModel";
import "./styles.scss";

const Register = () => {
  return (
    <main className="auth">
      <div className="auth__login-bg"></div>
      <div className="auth__register-bg"></div>
      <div className="auth__box-content">
        <div className="box-content__login">
          <LoginModel />
        </div>
      </div>
    </main>
  );
};

export default Register;
