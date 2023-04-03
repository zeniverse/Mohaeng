import styles from "./CourseList.module.css";

import React, { useEffect, useState } from "react";
import CourseItem from "./CourseItem";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import { getCourseListAction } from "@/src/store/reducers/CourseSlice";

const CourseList = () => {
  const { list } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // TODO: 들어갈 params 정리하기
    dispatch(getCourseListAction({ region: "서울" }));
  }, [dispatch]);

  return (
    <div className={styles["course-list-container"]}>
      {list?.map((course) => (
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
  );
};

export default CourseList;
