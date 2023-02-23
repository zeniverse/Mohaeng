interface PrevArrowProps {
  className?: any;
  style?: any;
  to?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
import styles from "./PrevArrow.module.css";

import { SlArrowRight } from "react-icons/sl";

export default function PrevArrow({
  className,
  style,
  onClick,
}: PrevArrowProps) {
  return (
    <div className={`${styles["prev-arrow"]}`} onClick={onClick}>
      <SlArrowRight />
    </div>
  );
}
