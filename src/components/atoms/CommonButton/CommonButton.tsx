"use client";
import "./styles.scss";

type commonButtonType = {
  children: React.ReactNode | string | number;
  style:
    | "fill"
    | "onlyChildren"
    | "onlyBorder"
    | "modern-fill"
    | "modern-onlyBorder"
    | "square"
    | "none";
  disabled?: boolean;
  onClick?: () => void;
};

export const CommonButton = ({
  children,
  style,
  disabled,
  onClick,
}: commonButtonType): JSX.Element => {
  return (
    <button
      className={`common-button ${style}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
