import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import { useCallback, useEffect, useState } from "react";
import { getMyCourse } from "@/src/store/reducers/myCourseSlice";
import cookie from "react-cookies";
import Image from "next/image";

import styles from "./CourseDetailHead.module.css";
import { getCourseDetailAction } from "@/src/store/reducers/CourseDetailSlice";
import { useRouter } from "next/router";
import { useRouterQuery } from "@/src/hooks/useRouterQuery";
import { removeCourseAction } from "@/src/store/reducers/CourseListSlice";
import { addFormValue } from "@/src/store/reducers/CourseFormSlice";

const CourseDetailHead = () => {
  const [formattedDate, setFormattedDate] = useState("");
  const courseDetail = useAppSelector((state) => state.courseDetail.course);
  const { courseId, title, profileImgUrl, places, nickname, createdDate } =
    courseDetail;
  const { nickName } = useAppSelector((state) => state.nickName);
  const dispatch = useAppDispatch();
  const id = useRouterQuery("id");
  const router = useRouter();

  useEffect(() => {
    if (id) {
      dispatch(getCourseDetailAction(id));
    }
  }, [id]);
  const getFomattedDate = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  }, []);

  const handleRemoveCourse = () => {
    if (confirm(`${title} 코스를 정말 삭제하시겠습니까?`)) {
      if (id) {
        const accessToken = cookie.load("accessToken");
        dispatch(removeCourseAction(id)).then(() =>
          dispatch(getMyCourse(accessToken))
        );

        router.push("/course");
      }
    }
  };

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

  useEffect(() => {
    const FormattedDate = getFomattedDate(new Date(createdDate));
    setFormattedDate(FormattedDate);
  }, [createdDate]);

  return (
    <div className={styles["detail-head-container"]}>
      <h1 className={styles["title-wrapper"]}>
        <div className={styles["course-length"]}>
          {places && `${places.length}코스`}
        </div>
        {title}
      </h1>
      <div className={styles["detail-head-nav"]}>
        {profileImgUrl && nickname && (
          <div className={styles["user-info"]}>
            <Image
              className={styles["kakao-profile-img"]}
              src={profileImgUrl}
              alt="카카오프로필"
              width={36}
              height={36}
            />
            <p>{nickname}</p>
          </div>
        )}
        <div className={styles["nav-right"]}>
          <span className={styles["create-date"]}>{formattedDate}</span>
          {nickName === nickname ? (
            <div className={styles["btn-wrapper"]}>
              <div
                className={`${styles["edit-btn"]} ${styles.btn}`}
                onClick={handleEditCourse}
              >
                수정
              </div>
              <div
                className={`${styles["remove-btn"]} ${styles.btn}`}
                onClick={handleRemoveCourse}
              >
                삭제
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailHead;
