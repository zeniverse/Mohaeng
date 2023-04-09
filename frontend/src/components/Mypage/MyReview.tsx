import styles from "./MyReview.module.css";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import MyReviewItem from "./MyReviewItem";

const MyReview = () => {
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
          />
        ))}
      </div>
    </>
  );
};

export default MyReview;
