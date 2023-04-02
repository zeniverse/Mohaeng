import styles from "./index.module.css";
import React from "react";
import CourseInputForm from "@/src/components/CreateCourse/CourseInputForm";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import {
  createCourseAction,
  initialState,
  setFormValue,
} from "@/src/store/reducers/CourseFormSlice";
import CoursePlaceInput from "@/src/components/CreateCourse/CoursePlaceInput";

import { ICourseForm } from "@/src/interfaces/Course.type";
import KakaoMap from "@/src/components/KakaoMap/KakaoMap";
import { kakaoPlaces } from "@/src/interfaces/Course";

export default function index() {
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
    const { places, ...rest } = course; // places 프로퍼티 분리
    const extractedPlaceIds = places.map((place) => place.placeId);
    const submitData = {
      ...rest,
      thumbnailUrl: places[0].imgUrl,
      placeIds: extractedPlaceIds,
    };
    console.log(submitData);
    dispatch(createCourseAction(submitData));
  };

  let mapData: kakaoPlaces[] = course.places?.map((place) => ({
    placeId: place.placeId,
    name: place.name,
    mapX: place.mapX,
    mapY: place.mapY,
  }));

  return (
    <div className={styles["create-course-container"]}>
      <div className={styles["input-container"]}>
        <CourseInputForm onChange={handleInputChange} />
        <CoursePlaceInput />
      </div>
      <div className={styles["right-container"]}>
        <div className={styles["kakaomap-wrapper"]}>
          {mapData && mapData.length > 0 && <KakaoMap positions={mapData} />}
        </div>

        {/* <div className={styles["orderlist-wrapper"]}>
          {places && <CourseOrderList places={places} />}
        </div> */}
      </div>
      <button type="submit" onClick={handleCourseSubmit}>
        작성하기
      </button>
    </div>
  );
}
