import styles from "./MyCourse.module.css";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { BiBookmark } from "react-icons/bi";
import UserBookmarkItem from "./UserBookmarkItem";
import MyCourseItem from "./MyCourseItem";

const MyCourse = () => {
  const myCourse = useSelector((state: RootState) => state.myCourse.data);

  return (
    <>
      <div className={styles.tabContainer}></div>
      <div className={styles["bookmark-container"]}>
        {myCourse.map((course) => (
          <MyCourseItem
            courseId={course.courseId}
            imgUrl={course.imgUrl}
            title={course.title}
            likeCount={course.likeCount}
            createdDate={course.createdDate}
            content={course.content}
            courseDays={course.courseDays}
            courseStatus={course.courseStatus}
          />
        ))}
      </div>
    </>
  );
};

export default MyCourse;
