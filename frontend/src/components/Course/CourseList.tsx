import styles from "./CourseList.module.css";

import React, { useEffect, useState } from "react";
import CourseItem from "./CourseItem";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import { getCourseListAction } from "@/src/store/reducers/CourseSlice";
import Pagebar from "../Pagenation/Pagebar";

const CourseList = () => {
  const { courseList, totalElements, totalPages } = useAppSelector(
    (state) => state.course
  );
  const selectedData = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const { region } = selectedData;

  useEffect(() => {
    // TODO: 들어갈 params 정리하기
    if (region && region !== "전체보기") {
      dispatch(getCourseListAction({ region }));
    }
  }, [dispatch, region]);

  return (
    <>
      <div className={styles["course-list-container"]}>
        {courseList?.map((course) => (
          <CourseItem
            key={course.id}
            id={course.id.toString()}
            title={course.title}
            content={course.content}
            likeCount={course.likeCount}
            thumbnailUrl={course.thumbnailUrl}
            courseDays={course.courseDays}
            places={course.places}
          />
        ))}
      </div>
      {totalPages && <Pagebar totalPage={totalPages} />}
    </>
  );
};

export default CourseList;
