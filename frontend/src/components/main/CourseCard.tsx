import React from "react";
import { BsFillHeartFill } from "react-icons/bs";
import styles from "./CourseCard.module.css";

interface items {
  courseId: number;
  coursetitle: string;
  content: string;
  imgUrl: string;
}
type CourseProps = {
  id: number;
  courseTitle: string;
  courseDesc: string;
  courseLike: number;
  courseList: items[];
};

const CourseCard = ({
  id,
  courseTitle,
  courseDesc,
  courseLike,
  courseList,
}: CourseProps) => {
  const Img = courseList[0].imgUrl;
  return (
    <div className={styles["coursecard-container"]}>
      <div className={styles["image-container"]}>
        <img src={Img} />
        <div className={styles["like-container"]}>
          <BsFillHeartFill color="red" size={20} />
          <span>{courseLike}</span>
        </div>
      </div>
      <div className={styles["coursecard-content"]}>
        <div className={styles["coursecard-title"]}>
          <h3>{courseTitle}</h3>
        </div>
        <div className={styles["coursecard-desc"]}>
          <p>{courseDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
