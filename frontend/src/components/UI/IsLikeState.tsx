import styles from "./IsLikeState.module.css";
import { BsFillHeartFill } from "react-icons/bs";

const IsLikeState = ({ courseLike }: { courseLike: number | string }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };
  return (
    <>
      {" "}
      <div className={styles["course-like-container"]} onClick={handleClick}>
        <BsFillHeartFill color="red" size={20} />
        <span className={styles.courseLike}>{courseLike}</span>
      </div>
    </>
  );
};

export default IsLikeState;
