import styles from "./CourseDetailNav.module.css";
import { useState } from "react";
import RoughMap from "../Course/RoughMap";
import {
  BsBookmark,
  BsBookmarkFill,
  BsMapFill,
  BsMap,
  BsShare,
  BsHeartFill,
  BsHeart,
} from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import {
  detailBookmarkToggleAction,
  detailLikeToggleAction,
} from "@/src/store/reducers/CourseDetailSlice";

const CourseDetailNav = () => {
  const [isRoughMapOpen, setIsRoughMapOpen] = useState(false);
  const dispatch = useAppDispatch();
  const course = useAppSelector((state) => state.courseDetail.course);
  const { likeCount, places, courseId, isBookmarked, isLiked } = course;

  const toggleRoughMapHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setIsRoughMapOpen((prev) => !prev);
  };
  const onClose = () => {
    setIsRoughMapOpen(false);
  };

  const bookmarkHandler = (id: number) => {
    dispatch(detailBookmarkToggleAction(id));
  };

  const handleDetailLike = () => {
    dispatch(detailLikeToggleAction(courseId));
  };

  const RoughMapData = places?.map((place) => place.name).join(", ");

  return (
    <div className={styles["title-nav"]}>
      <div className={styles["title-nav-left"]}>
        <span className={styles.like}>
          {isLiked ? (
            <BsHeartFill className={styles.heart} onClick={handleDetailLike} />
          ) : (
            <BsHeart className={styles.heart} onClick={handleDetailLike} />
          )}
          <div>{likeCount}</div>
        </span>
      </div>
      <div className={styles["title-nav-right"]}>
        <div
          className={`${styles["item-nav"]} ${styles.roughmapBtn}`}
          onClick={toggleRoughMapHandler}
        >
          {isRoughMapOpen ? (
            <BsMapFill
              className={styles["map-icon"]}
              color="var(--color-blue)"
            />
          ) : (
            <BsMap className={styles["map-icon"]} />
          )}
          {isRoughMapOpen && (
            <RoughMap RoughMapData={RoughMapData} onClose={onClose} />
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
          <BsShare />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailNav;
