import { GrPowerReset } from "react-icons/gr";
import styles from "./ResetButton.module.css";

const ResetButton = ({ onClick }: any) => {
  return (
    <button className={styles["reset-btn"]} onClick={onClick}>
      <GrPowerReset />
      초기화
    </button>
  );
};

export default ResetButton;
