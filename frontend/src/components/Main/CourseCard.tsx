import { CourseProps } from "@/src/interfaces/Course";
import Image from "next/image";
import { BsFillHeartFill } from "react-icons/bs";
import styles from "./CourseCard.module.css";

const CourseCard = ({
  id,
  courseTitle,
  courseDesc,
  courseLike,
  courseList,
}: CourseProps) => {
  console.log(courseList);
  const Img = courseList[0].imgUrl;
  return (
    <div className={styles["course-card-container"]}>
      <div className={styles["course-image-container"]}>
        <Image src={Img} alt={courseTitle} width={700} height={700} priority />
        <div className={styles["course-like-container"]}>
          <BsFillHeartFill color="red" size={20} />
          <span>{courseLike}</span>
        </div>
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
