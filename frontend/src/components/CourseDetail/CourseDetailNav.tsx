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
import { openModal } from "@/src/store/reducers/modalSlice";
import TagItem from "../UI/TagItem";

const CourseDetailNav = () => {
  const [isRoughMapOpen, setIsRoughMapOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector((state) => state.token);
  const course = useAppSelector((state) => state.courseDetail.course);
  const {
    likeCount,
    places,
    courseId,
    isBookmarked,
    isLiked,
    startDate,
    endDate,
    region,
  } = course;

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

  const RoughMapData = places?.map((place) => place.name).join(",");

  return (
    <div className={styles["title-nav"]}>
      <div className={styles["title-nav-left"]}>
        <div className={styles["simple-info"]}>
          <div className={styles.date}>
            <TagItem size="M" text="기간" bgColor="Dsky" />
            <p className={styles.text}>
              {startDate} ~ {endDate}
            </p>
          </div>
          <div className={styles.region}>
            <TagItem size="M" text="지역" bgColor="LMarinBlue" />
            <p className={styles.text}>{region}</p>
          </div>
        </div>
      </div>
      <div className={styles["title-nav-right"]}>
        <span className={styles.like}>
          {/* TODO: 컴포넌트화 */}
          {isLiked ? (
            <BsHeartFill className={styles.heart} onClick={handleDetailLike} />
          ) : (
            <BsHeart className={styles.heart} onClick={handleDetailLike} />
          )}
          <div className={styles.likeCount}>{likeCount}</div>
        </span>
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
