import { CourseProps } from "@/src/interfaces/Course";
import Image from "next/image";
import IsLikeState from "../UI/IsLikeState";
import styles from "./CourseCard.module.css";

const CourseCard = ({
  id,
  courseTitle,
  courseDesc,
  courseLike,
  courseList,
  courseDays,
  thumbnailUrl,
}: CourseProps) => {
  return (
    <div className={styles["course-card-container"]}>
      <div className={styles["course-image-container"]}>
        <Image
          src={thumbnailUrl}
          alt={courseTitle}
          width={700}
          height={700}
          priority
        />
        <IsLikeState courseLike={courseLike} />
      </div>
      <div className={styles["course-card-content"]}>
        <div className={styles["course-card-title"]}>
          <h3>{courseTitle}</h3>
        </div>
        <div className={styles["course-card-desc"]}>
          <p>{courseDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
