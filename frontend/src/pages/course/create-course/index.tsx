import styles from "./index.module.css";
import React from "react";
import CourseInputForm from "@/src/components/CreateCourse/CourseInputForm";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { FormValues, setFormValue } from "@/src/store/reducers/CourseFormSlice";

export default function index() {
  const dispatch = useAppDispatch();
  const {
    title,
    startDate,
    endDate,
    isPublished,
    courseDays,
    region,
    thumbnailUrl,
    content,
  } = useAppSelector((state) => state.course);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    console.log(newValue);
    dispatch(setFormValue({ name: name as keyof FormValues, value: newValue }));
  };

  const handleCourseSubmit = () => {
    console.log("Submitting form with data: ", {
      title,
      startDate,
      endDate,
      isPublished,
      courseDays,
      region,
      thumbnailUrl,
      content,
    });
    // dispatch(resetFormValue());
  };
  return (
    <div className={styles["create-course-container"]}>
      <CourseInputForm onChange={handleInputChange} />
      <button onClick={handleCourseSubmit}>작성하기</button>
    </div>
  );
}
