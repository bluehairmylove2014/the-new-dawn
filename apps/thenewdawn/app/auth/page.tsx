'use client';
import LoginModel from '@presentational/molecules/LoginModel/LoginModel';
import RegisterModel from '@presentational/molecules/RegisterModel/RegisterModel';
import './styles.scss';
import { useState } from 'react';

export type authMethod = 'login' | 'register';
const Auth = () => {
  const [isLoginMethod, setIsLoginMethod] = useState<boolean>(true);

  // Methods

  const changeMethod = (method: authMethod) => {
    setIsLoginMethod(method === 'login');
  };

  return (
    <main className="auth">
      <div className={`auth_login-bg ${isLoginMethod ? 'active' : ''}`}></div>
      <div
        className={`auth_register-bg ${!isLoginMethod ? 'active' : ''}`}
      ></div>
      <div className="auth__box-content">
        {isLoginMethod ? (
          <LoginModel onChangeMethod={changeMethod} />
        ) : (
          <RegisterModel onChangeMethod={changeMethod} />
        )}
      </div>
    </main>
  );
};

export default Auth;
