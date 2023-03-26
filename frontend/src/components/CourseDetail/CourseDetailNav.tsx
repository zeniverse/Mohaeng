import styles from "./CourseDetailNav.module.css";
import { BiMapAlt, BiShareAlt, BiBookmarkPlus } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";

const CourseDetailNav = ({ likeCount }: any) => {
  return (
    <div className={styles["title-nav"]}>
      {/* 왼쪽 좋아요 오른쪽  북마크, 약도, 공유 */}
      <div className={styles["title-nav-left"]}>
        <span className={styles.like}>
          <BsFillHeartFill />
          {likeCount}
        </span>
      </div>
      <div className={styles["title-nav-right"]}>
        <div className={`${styles["item-nav"]}`}>
          <BiMapAlt
            className={styles.roughmapIcon}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
          />
          {/* {isRoughMapOpen && (
        <RoughMap
          RoughMapData={RoughMapData}
          setIsRoughMapOpen={setIsRoughMapOpen}
          isRoughMapOpen={isRoughMapOpen}
        />
      )} */}
        </div>
        <div className={styles["item-nav"]}>
          <BiBookmarkPlus />
        </div>
        <div className={`${styles["item-nav"]}`}>
          <BiShareAlt />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailNav;
