import styles from "./IsLikeState.module.css";
import { BsHeartFill, BsHeart } from "react-icons/bs";
const IsLikeState = ({ likeCount, isLiked, onClick }: any) => {
  return (
    <>
      <div className={styles["course-like-container"]} onClick={onClick}>
        {isLiked ? (
          <BsHeartFill className={styles.heart} />
        ) : (
          <BsHeart className={styles.heart} />
        )}
        <span className={styles.likeCount}>{likeCount}</span>
      </div>
    </>
  );
};

export default IsLikeState;
