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
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import {
  listBookmarkToggleAction,
  listLikeToggleAction,
} from "@/src/store/reducers/CourseListSlice";
import { getCourseBookmark } from "@/src/store/reducers/CourseBoomarkSlice";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import IsLikeState from "../UI/IsLikeState";
import { openModal } from "@/src/store/reducers/modalSlice";
import { kakaoShare } from "@/src/utils/kakao-share";

declare global {
  interface Window {
    Kakao: any;
  }
}

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

  const { id: userId } = useAppSelector((state) => state.token);
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
    if (userId) {
      dispatch(listBookmarkToggleAction(id)).then(() => {
        dispatch(getCourseBookmark(accessToken));
      });
    } else {
      dispatch(
        openModal({
          modalType: "LoginModal",
          isOpen: true,
        })
      );
    }
  };

  const handleToggleLike = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (userId) {
      dispatch(listLikeToggleAction({ courseId, isLiked }));
    } else {
      dispatch(
        openModal({
          modalType: "LoginModal",
          isOpen: true,
        })
      );
    }
  };

  const handleLinkClick = () => {
    router.push(`/course/${courseId}`);
  };

  const handleKakaoShare = () => {
    if (userId) {
      const param = {
        templateId: 93215,
        title,
        content,
        thumbnailUrl,
        likeCount,
        courseId,
      };
      kakaoShare(param);
    } else {
      dispatch(
        openModal({
          modalType: "LoginModal",
          isOpen: true,
        })
      );
    }
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
          {courseDays && <TagItem size="S" text={courseDays} />}
        </div>
      </div>
      <div className={styles["item-nav-container"]}>
        <div
          className={styles["item-nav"]}
          onClick={() => bookmarkHandler(courseId)}
        >
          {isBookmarked ? (
            <BsBookmarkFill className={`${styles.bookmark} ${styles.icon}`} />
          ) : (
            <BsBookmark className={`${styles.unbookmark} ${styles.icon}`} />
          )}
        </div>
        <div
          className={`${styles["item-nav"]} ${styles.center}`}
          onClick={handleKakaoShare}
        >
          <BsShare className={styles.icon} />
        </div>
        <div
          className={`${styles["item-nav"]} ${styles.roughmapBtn}`}
          onClick={toggleRoughMapHandler}
        >
          {isRoughMapOpen ? (
            <BsMapFill className={styles.icon} color="var(--color-blue)" />
          ) : (
            <BsMap className={styles.icon} />
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
