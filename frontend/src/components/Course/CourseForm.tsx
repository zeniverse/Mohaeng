import styles from "./CourseForm.module.css";
import React from "react";
import CourseInputForm from "@/src/components/CreateCourse/CourseInputForm";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import {
  initialState,
  resetFormValue,
} from "@/src/store/reducers/courseFormSlice";
import CoursePlaceInput from "@/src/components/CreateCourse/CoursePlaceInput";

import KakaoMap from "@/src/components/KakaoMap/KakaoMap";

import CourseOrderList from "@/src/components/CourseDetail/CourseOrderList";
import { useRouter } from "next/router";
import { resetFilter } from "@/src/store/reducers/filterSlice";
import { getMyCourse } from "@/src/store/reducers/myCourseSlice";
import cookie from "react-cookies";
import { useRouterQuery } from "@/src/hooks/useRouterQuery";
import {
  createCourseAction,
  editCourseAction,
  getCourseListAction,
} from "@/src/store/thunks/courseThunks";

interface CourseFormProps {
  isEditMode: boolean;
}

const CourseForm = ({ isEditMode }: CourseFormProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { course, isFormValid } = useAppSelector(
    (state) => state.courseForm ?? initialState
  );
  const accessToken = cookie.load("accessToken");
  const id = useRouterQuery("courseId");

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return window.alert("양식을 다시 확인해주세요");
    if (!isEditMode) {
      await dispatch(createCourseAction(course));
      await router.push("/course");
    } else {
      if (id) {
        await dispatch(editCourseAction({ formData: course, courseId: id }));
        await dispatch(getCourseListAction({}));
        await dispatch(getMyCourse(accessToken));
        await router.push(`/course/${id}`);
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

export default React.memo(CourseForm);
