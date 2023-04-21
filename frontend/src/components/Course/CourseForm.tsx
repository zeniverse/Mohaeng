import styles from "./CourseForm.module.css";
import React from "react";
import CourseInputForm from "@/src/components/CreateCourse/CourseInputForm";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import {
  createCourseAction,
  editCourseAction,
  initialState,
  resetFormValue,
} from "@/src/store/reducers/CourseFormSlice";
import CoursePlaceInput from "@/src/components/CreateCourse/CoursePlaceInput";

import KakaoMap from "@/src/components/KakaoMap/KakaoMap";

import CourseOrderList from "@/src/components/CourseDetail/CourseOrderList";
import { useRouter } from "next/router";
import { resetFilter } from "@/src/store/reducers/FilterSlice";
import { getMyCourse } from "@/src/store/reducers/myCourseSlice";
import cookie from "react-cookies";
import { useRouterQuery } from "@/src/hooks/useRouterQuery";
import { getCourseListAction } from "@/src/store/reducers/CourseListSlice";

interface CourseFormProps {
  isEditMode: boolean;
}

const CourseForm = ({ isEditMode }: CourseFormProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { course } = useAppSelector(
    (state) => state.courseForm ?? initialState
  );
  const accessToken = cookie.load("accessToken");
  const id = useRouterQuery("courseId");

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const editData = id ? { courseId: id, course } : null;
    if (!isEditMode) {
      await dispatch(createCourseAction(course));
      await dispatch(getMyCourse(accessToken));
      router.push("/course");
    } else {
      if (editData) {
        await dispatch(editCourseAction(editData));
        await dispatch(getCourseListAction({}));
        await dispatch(getMyCourse(accessToken));
        router.push(`/course/${editData.courseId}`);
      }
    }
    dispatch(resetFormValue());
    dispatch(resetFilter());
  };

  const handleCourseCancel = () => {
    dispatch(resetFormValue());
    // as를 전달하여 페이지가 새로 고쳐지고 데이터가 업데이트 됨.
    router.push("/course", "/course");
  };

  return (
    <>
      <div className={styles["course-form-container"]}>
        <div className={styles["input-container"]}>
          <CourseInputForm />
          <CoursePlaceInput />
        </div>
        {course?.places?.length > 0 && (
          <div className={styles.info}>
            <KakaoMap mapData={course.places} />
            <CourseOrderList places={course?.places} mode={"write"} />
          </div>
        )}
        <div className={styles["button-wrapper"]}>
          <button
            className={`${styles["cancel-btn"]} ${styles.btn}`}
            onClick={handleCourseCancel}
          >
            취소
          </button>
          <button
            className={`${styles["submit-btn"]} ${styles.btn}`}
            onClick={handleCourseSubmit}
          >
            {isEditMode ? "수정하기" : "작성하기"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseForm;
