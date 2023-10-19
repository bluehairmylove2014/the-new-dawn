import { Controller } from "react-hook-form";
import "./styles.scss";

export type authInputParams = {
  name: string;
  label: string;
  type: "email" | "password" | "text";
  control: any;
  rules: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  };
  onChange?: (value: string) => void;
};
const AuthInput = ({
  name,
  label,
  type,
  control,
  rules,
  onChange,
}: authInputParams) => {
  return (
    <div className="auth-input">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              id={name}
              {...field}
              onChange={(e) => {
                const value = e.target.value.trim();
                field.onChange(value);
                onChange && onChange(value);
              }}
            />
          </>
        )}
      />
    </div>
  );
};

export default AuthInput;
