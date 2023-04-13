import { useCallback, useEffect, useState } from "react";
import styles from "./courseDetail.module.css";

import CourseDetailNav from "@/src/components/CourseDetail/CourseDetailNav";
import CourseDetailContent from "@/src/components/CourseDetail/CourseDetailContent";
import { useRouterQuery } from "@/src/hooks/useRouterQuery";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import { getCourseDetailAction } from "@/src/store/reducers/CourseDetailSlice";

export default function CourseDetail() {
  const courseDetail = useAppSelector((state) => state.courseDetail.course);
  const {
    courseId,
    title,
    content,
    likeCount,
    createdDate,
    isBookmarked,
    places,
  } = courseDetail;
  const dispatch = useAppDispatch();
  const id = useRouterQuery("id");

  useEffect(() => {
    if (id) {
      dispatch(getCourseDetailAction(id));
    }
  }, [id]);

  const placeNames = places?.map((place) => place.name).join(",");

  return (
    <>
      <div className={styles["course-id-container"]}>
        <div className={styles["title-container"]}>
          <h1 className={styles.title}>
            <div className={styles["title-length"]}>
              {places && `${places.length}코스`}
            </div>
            {title}
          </h1>
          <div className={styles["title-info"]}>
            <span className={styles.userinfo}>유저 정보</span>
          </div>
        </div>
        <CourseDetailNav />
        <CourseDetailContent
          mapData={places}
          places={places}
          content={content}
        />
      </div>
    </>
  );
}
