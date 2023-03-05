import styles from "./CourseItem.module.css";

import { CourseProps } from "@/src/interfaces/Course";
import React from "react";
import Image from "next/image";

import {
  BsFillHeartFill,
  BsFillBookmarkPlusFill,
  BsBookmark,
  BsShareFill,
} from "react-icons/bs";

const CourseItem = ({
  id,
  courseTitle,
  courseDesc,
  courseLike,
  courseList,
}: CourseProps) => {
  const Img = courseList[0].imgUrl;
  return (
    <div className={styles["course-item-container"]}>
      <div className={styles["course-img-container"]}>
        <Image src={Img} alt={courseTitle} fill priority />
      </div>
      <div className={styles["course-content-container"]}>
        <div className={styles["course-content-left"]}>
          <div className={styles["course-content-text"]}>
            <h2>{courseTitle}</h2>
            <p>{courseDesc}</p>
          </div>
          <div className={styles["content-item"]}>
            <BsBookmark />
            <BsShareFill />
          </div>
        </div>
        <div className={styles["course-content-right"]}>
          <BsFillHeartFill />
          <span>{courseLike}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
