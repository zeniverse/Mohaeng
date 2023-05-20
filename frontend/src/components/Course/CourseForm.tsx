import styles from "./CourseForm.module.css";
import React from "react";
import CourseInputForm from "@/src/components/CreateCourse/CourseInputForm";
import { useAppSelector } from "@/src/hooks/useReduxHooks";
import { initialState } from "@/src/store/reducers/CourseFormSlice";
import CoursePlaceInput from "@/src/components/CreateCourse/CoursePlaceInput";

import KakaoMap from "@/src/components/KakaoMap/KakaoMap";

import CourseOrderList from "@/src/components/CourseDetail/CourseOrderList";
import CourseFormButton from "./CourseFormButton";

export interface CourseFormProps {
  isEditMode: boolean;
}

const CourseForm = ({ isEditMode }: CourseFormProps) => {
  const { course } = useAppSelector(
    (state) => state.courseForm ?? initialState,
    (prev, next) => {
      // equalityFn으로 이전 값과 새 값을 비교하여 변경이 없으면 true를 반환
      return prev.course === next.course;
    }
  );
  return (
    <>
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
      <CourseFormButton isEditMode={isEditMode} />
    </>
  );
};

export default React.memo(CourseForm);
