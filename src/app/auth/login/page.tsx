import LoginModel from "@/components/molecules/LoginModel/LoginModel";
import "./styles.scss";

const Login = () => {
  return (
    <main className="login">
      <div className="login__box-content">
        <LoginModel />
      </div>
    </main>
  );
};

export default Login;
