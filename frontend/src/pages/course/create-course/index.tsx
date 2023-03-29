import styles from "./index.module.css";
import React, { useRef, useState } from "react";
import CourseInputForm from "@/src/components/CreateCourse/CourseInputForm";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { FormValues, setFormValue } from "@/src/store/reducers/CourseFormSlice";
import CourseOrderList from "@/src/components/CourseDetail/CourseOrderList";
import { BsChevronDoubleDown } from "react-icons/bs";
import CoursePlaceInput from "@/src/components/CreateCourse/CoursePlaceInput";

const places = [
  {
    placeId: 1,
    name: "경복궁",
    imgUrl: "http://tong.visitkorea.or.kr/cms/resource/46/2010746_image2_1.jpg",
    address: "서울시 종로구 ...",
    mapX: "37.579887",
    mapY: "126.976870",
  },
  {
    placeId: 2,
    name: "창경궁",
    imgUrl: "http://tong.visitkorea.or.kr/cms/resource/46/2010746_image2_1.jpg",
    address: "서울시 종로구 ...",
    mapX: "37.566820",
    mapY: "126.978650",
  },
  {
    placeId: 3,
    name: "가계해변",
    imgUrl: "http://tong.visitkorea.or.kr/cms/resource/46/2010746_image2_1.jpg",
    address: "서울시 종로구 ...",
    mapX: "34.43545",
    mapY: "126.354741",
  },
  {
    placeId: 4,
    name: "가고파 꼬부랑길 벽화마을",
    imgUrl: "http://tong.visitkorea.or.kr/cms/resource/46/2010746_image2_1.jpg",
    address: "서울시 종로구 ...",
    mapX: "35.207766",
    mapY: "128.56965",
  },
  {
    placeId: 5,
    name: "가나아트파크",
    imgUrl: "http://tong.visitkorea.or.kr/cms/resource/46/2010746_image2_1.jpg",
    address: "서울시 종로구 ...",
    mapX: "37.725451",
    mapY: "126.949749",
  },
  {
    placeId: 6,
    name: "가지말라",
    imgUrl: "http://tong.visitkorea.or.kr/cms/resource/46/2010746_image2_1.jpg",
    address: "서울시 종로구 ...",
    mapX: "36.725451",
    mapY: "128.949749",
  },
];

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
      <div className={styles["left-container"]}>
        <CourseInputForm onChange={handleInputChange} />
      </div>
      <div className={styles["right-container"]}>
        <div className={styles["placeForm-wrapper"]}>
          <CoursePlaceInput />
        </div>
        {/* <div className={styles["orderlist-wrapper"]}>
          {places && <CourseOrderList places={places} />}
        </div> */}
      </div>
      {/* <button onClick={handleCourseSubmit}>작성하기</button> */}
    </div>
  );
}
