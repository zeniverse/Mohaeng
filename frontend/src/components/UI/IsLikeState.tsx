import styles from "./IsLikeState.module.css";
import { BsFillHeartFill } from "react-icons/bs";

const IsLikeState = ({ courseLike }: { courseLike: number | string }) => {
  return (
    <>
      {" "}
      <div className={styles["course-like-container"]}>
        <BsFillHeartFill color="red" size={20} />
        <span className={styles.courseLike}>{courseLike}</span>
      </div>
    </>
  );
};

export default IsLikeState;
