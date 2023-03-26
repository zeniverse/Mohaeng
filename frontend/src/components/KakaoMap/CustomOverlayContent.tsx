import styles from "./CustomOverlayContent.module.css";
import Link from "next/link";

interface objProps {
  title: string;
}

const CustomOverlayContent = ({ title }: objProps) => {
  return (
    <div className={styles.spot}>
      {/* TODO: place/id로 이동 */}
      <Link className={styles.link} href="/course">
        <span className={styles.title}>{title}</span>
      </Link>
    </div>
  );
};

export default CustomOverlayContent;
