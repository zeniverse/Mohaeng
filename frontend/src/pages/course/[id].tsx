import { useCallback, useEffect, useState } from "react";
import styles from "./courseDetail.module.css";

import CourseDetailNav from "@/src/components/CourseDetail/CourseDetailNav";
import CourseDetailContent from "@/src/components/CourseDetail/CourseDetailContent";
import { useRouterQuery } from "@/src/hooks/useRouterQuery";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import { getCourseDetailAction } from "@/src/store/reducers/CourseDetailSlice";
import { removeCourseAction } from "@/src/store/reducers/CourseListSlice";
import { useRouter } from "next/router";
import { addFormValue } from "@/src/store/reducers/CourseFormSlice";

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
    nickname,
  } = courseDetail;
  const { nickName } = useAppSelector((state) => state.nickName);
  const dispatch = useAppDispatch();
  const id = useRouterQuery("id");
  const router = useRouter();

  useEffect(() => {
    if (id) {
      dispatch(getCourseDetailAction(id));
    }
  }, [id]);

  const handleRemoveCourse = () => {
    if (confirm(`${title} 코스를 정말 삭제하시겠습니까?`)) {
      if (id) {
        dispatch(removeCourseAction(id));
        router.push("/course");
      }
    }
  };

  // title: "",
  // content: "",
  // courseDays: "",
  // startDate: "",
  // endDate: "",
  // region: "",
  // isPublished: true,
  // isBookmarked: false,
  // isLiked: true,
  // places: [],

  const handleEditCourse = () => {
    const CourseFormValue = {
      title: courseDetail.title,
      content: courseDetail.content,
      courseDays: courseDetail.courseDays,
      startDate: courseDetail.startDate,
      endDate: courseDetail.endDate,
      region: courseDetail.region,
      isPublished: courseDetail.isPublished,
      isBookmarked: courseDetail.isBookmarked,
      isLiked: courseDetail.isLiked,
      places: courseDetail.places,
    };

    dispatch(addFormValue(CourseFormValue));
    router.push({
      pathname: "/course/edit-course",
      query: { courseId: courseId },
    });
  };

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
            {nickName === nickname ? (
              <div className={styles["btn-wrapper"]}>
                <button
                  className={`${styles["remove-btn"]} ${styles.btn}`}
                  onClick={handleRemoveCourse}
                >
                  삭제
                </button>
                <button
                  className={`${styles["edit-btn"]} ${styles.btn}`}
                  onClick={handleEditCourse}
                >
                  수정
                </button>
              </div>
            ) : null}
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
