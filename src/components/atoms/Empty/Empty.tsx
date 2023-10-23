import EmptyBoxIcon from "@/assets/icons/empty-box.png";
import Icon from "../Icon/Icon";
import "./styles.scss";

const defaultSize = 50;
const Empty = ({
  label,
  customSize,
}: {
  label: string;
  customSize?: number;
}) => {
  return (
    <div className="empty">
      <Icon
        media={EmptyBoxIcon}
        alt="empty"
        customWidth={customSize || defaultSize}
        customHeight={customSize || defaultSize}
      />
      <p>{label}</p>
    </div>
  );
};

export default Empty;
