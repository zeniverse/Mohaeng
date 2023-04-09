import styles from "./index.module.css";
import React from "react";
import CourseInputForm from "@/src/components/CreateCourse/CourseInputForm";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import {
  createCourseAction,
  initialState,
  resetFormValue,
  setFormValue,
} from "@/src/store/reducers/CourseFormSlice";
import CoursePlaceInput from "@/src/components/CreateCourse/CoursePlaceInput";

import { ICourseForm } from "@/src/interfaces/Course.type";
import KakaoMap from "@/src/components/KakaoMap/KakaoMap";
import { kakaoPlaces } from "@/src/interfaces/Course";
import CourseOrderList from "@/src/components/CourseDetail/CourseOrderList";
import { useRouter } from "next/router";
import { resetFilter } from "@/src/store/reducers/FilterSlice";

export default function index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { course } = useAppSelector(
    (state) => state.courseForm ?? initialState
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    dispatch(
      setFormValue({ name: name as keyof ICourseForm, value: newValue })
    );
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createCourseAction(course));
    dispatch(resetFormValue());
    dispatch(resetFilter());

    // as를 전달하여 페이지가 새로 고쳐지고 데이터가 업데이트 됨.
    router.push("/course", "/course");
  };

  const handleCourseCancel = () => {
    dispatch(resetFormValue());
    // as를 전달하여 페이지가 새로 고쳐지고 데이터가 업데이트 됨.
    router.push("/course", "/course");
  };

  return (
    <div className={styles["create-course-container"]}>
      <div className={styles["input-container"]}>
        <CourseInputForm onChange={handleInputChange} />
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
          type="submit"
          className={`${styles["submit-btn"]} ${styles.btn}`}
          onClick={handleCourseSubmit}
        >
          작성하기
        </button>
      </div>
    </div>
  );
}
