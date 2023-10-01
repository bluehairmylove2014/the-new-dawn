import "./styles.scss";

type commonButtonType = {
  children: React.ReactNode | string | number;
  style:
    | "fill"
    | "onlyChildren"
    | "onlyBorder"
    | "modern-fill"
    | "modern-onlyBorder"
    | "none";
  onClick?: () => void;
};

export const CommonButton = ({
  children,
  style,
  onClick,
}: commonButtonType): JSX.Element => {
  return (
    <button className={`common-button ${style}`} onClick={onClick}>
      {children}
    </button>
  );
};
