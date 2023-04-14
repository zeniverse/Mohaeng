import { CourseListProps } from "@/src/interfaces/Course";
import styles from "./CourseItem.module.css";
import React, { useState } from "react";
import Image from "next/image";

import {
  BsBookmark,
  BsBookmarkFill,
  BsMapFill,
  BsMap,
  BsShare,
} from "react-icons/bs";

import RoughMap from "./RoughMap";

import TagItem from "../UI/TagItem";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import {
  listBookmarkToggleAction,
  listLikeToggleAction,
} from "@/src/store/reducers/CourseListSlice";
import { getCourseBookmark } from "@/src/store/reducers/CourseBoomarkSlice";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import IsLikeState from "../UI/IsLikeState";

const CourseItem = ({
  courseId,
  title,
  content,
  likeCount,
  courseDays,
  thumbnailUrl,
  isBookmarked,
  isLiked,
  places,
}: CourseListProps) => {
  const [isRoughMapOpen, setIsRoughMapOpen] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = cookie.load("accessToken");
  const router = useRouter();

  const toggleRoughMapHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setIsRoughMapOpen((prev) => !prev);
  };

  const onClose = () => {
    setIsRoughMapOpen(false);
  };

  const bookmarkHandler = (id: number) => {
    dispatch(listBookmarkToggleAction(id)).then(() => {
      dispatch(getCourseBookmark(accessToken));
    });
  };

  const handleToggleLike = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(listLikeToggleAction(courseId));
  };

  const handleLinkClick = () => {
    router.push(`/course/${courseId}`);
  };

  return (
    <div className={styles["course-item-container"]}>
      <div className={styles["item-info-container"]} onClick={handleLinkClick}>
        <div className={styles["item-image"]}>
          <div className={styles["item-image-box"]}></div>
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title}
              width={700}
              height={700}
              priority
            />
          ) : (
            <div>이미지 준비 중</div>
          )}
          <IsLikeState
            onClick={handleToggleLike}
            likeCount={likeCount}
            isLiked={isLiked}
          />
        </div>
        <div className={styles["item-info-text"]}>
          <h3>{title}</h3>
          <p>{content}</p>
          {courseDays && <TagItem text={courseDays} />}
        </div>
      </div>
      <div className={styles["item-nav-container"]}>
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
        <div className={`${styles["item-nav"]} ${styles.center}`}>
          <BsShare />
        </div>
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
            <RoughMap RoughMapData={places} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
