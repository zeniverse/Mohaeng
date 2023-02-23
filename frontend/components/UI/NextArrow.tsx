interface NextArrowProps {
  className?: any;
  style?: any;
  to?: any;
  children?: any;
  slidesCount?: any;
  currentSlide: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
import styles from "./NextArrow.module.css";

export default function NextArrow({
  className,
  style,
  onClick,
  children,
  slidesCount,
  currentSlide,
  to,
}: NextArrowProps) {
  return (
    <div
      className={`${className} ${styles[to]} ${styles["next-arrow"]}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
