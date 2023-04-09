import styles from "./CourseDetailNav.module.css";
import { BiMapAlt, BiShareAlt, BiBookmarkPlus } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";
import { useState } from "react";
import RoughMap from "../Course/RoughMap";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { toggleBookmarkAction } from "@/src/store/reducers/CourseListSlice";

const CourseDetailNav = ({
  likeCount,
  places,
  courseId,
  isBookmarked,
}: any) => {
  const [isRoughMapOpen, setIsRoughMapOpen] = useState(false);
  const dispatch = useAppDispatch();

  const toggleRoughMapHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setIsRoughMapOpen((prev) => !prev);
  };
  const onClose = () => {
    setIsRoughMapOpen(false);
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const bookmarkHandler = (id: number) => {
    dispatch(toggleBookmarkAction(id));
  };
  return (
    <div className={styles["title-nav"]}>
      <div className={styles["title-nav-left"]}>
        <span className={styles.like}>
          <BsFillHeartFill />
          {likeCount}
        </span>
      </div>
      <div className={styles["title-nav-right"]}>
        <div
          className={`${styles["item-nav"]} ${styles.roughmapBtn}`}
          onClick={toggleRoughMapHandler}
        >
          <BiMapAlt className={styles.roughmapIcon} />
          {isRoughMapOpen && (
            <RoughMap RoughMapData={places} onClose={onClose} />
          )}
        </div>
        <div
          className={styles["item-nav"]}
          onClick={() => bookmarkHandler(courseId)}
        >
          {/* TODO: CSS 손보기 컴포넌트 통일 */}
          {isBookmarked ? (
            <BsBookmarkFill className={styles.bookmark} />
          ) : (
            <BsBookmark className={styles.unbookmark} />
          )}
        </div>
        <div className={styles["item-nav"]}>
          <BiShareAlt />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailNav;
