"use client";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import "./styles.scss";

const defaultType = "button";

type buttonType = "button" | "submit";
type commonButtonType = {
  children: React.ReactNode | string | number;
  style:
    | "fill" // White
    | "onlyChildren" // White no border, background
    | "onlyBorder" // White, no background
    | "modern-fill" // soft yellow
    | "modern-onlyBorder" // no background, dark => soft yellow
    | "soft-fill" // Green button ( Checkout )
    | "soft-peach" // --soft-peach
    | "square" // circle, dat ten nham T.T
    | "none"; // no border, no background, color inherit
  disabled?: boolean;
  type?: buttonType;
  loading?: boolean;
  onClick?: (arg0: any) => void;
};

export const CommonButton = ({
  children,
  style,
  disabled,
  loading,
  type,
  onClick,
}: commonButtonType): JSX.Element => {
  return (
    <button
      className={`common-button ${style} ${loading ? "loading" : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type || defaultType}
    >
      <div className="loader">{loading ? <ButtonLoader /> : <></>}</div>
      {children}
    </button>
  );
};
