import styles from "./CourseDetailNav.module.css";
import { useCallback, useEffect, useState } from "react";
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
import { openModal } from "@/src/store/reducers/modalSlice";

const CourseDetailNav = () => {
  const [isRoughMapOpen, setIsRoughMapOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector((state) => state.token);
  const course = useAppSelector((state) => state.courseDetail.course);
  const { likeCount, places, courseId, isBookmarked, isLiked, createdDate } =
    course;

  const toggleRoughMapHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setIsRoughMapOpen((prev) => !prev);
  };
  const onClose = () => {
    setIsRoughMapOpen(false);
  };

  const bookmarkHandler = (id: number) => {
    if (userId) {
      dispatch(detailBookmarkToggleAction(id));
    } else {
      dispatch(
        openModal({
          modalType: "LoginModal",
          isOpen: true,
        })
      );
    }
  };

  const handleDetailLike = () => {
    if (userId) {
      dispatch(detailLikeToggleAction(courseId));
    } else {
      dispatch(
        openModal({
          modalType: "LoginModal",
          isOpen: true,
        })
      );
    }
  };

  const getFomattedDate = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  }, []);

  useEffect(() => {
    const FormattedDate = getFomattedDate(new Date(createdDate));
    setFormattedDate(FormattedDate);
  }, [createdDate]);

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
        <span className={styles.dateinfo}>{formattedDate}</span>
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
