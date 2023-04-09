"use client";
import Link from "next/link";
import styles from "./MyCourseItem.module.css";

export interface MyCourseItemProps {
  courseId: number;
  imgUrl: string;
  title: string;
  likeCount: number;
  createdDate: string;
  content: string;
  courseDays: string;
}

const MyCourseItem = (myCourse: MyCourseItemProps) => {
  return (
    <div key={myCourse.courseId} className={styles["myCourse-item"]}>
      <Link
        href={{
          pathname: "/course/[id]",
          query: { id: myCourse.courseId },
        }}
      >
        <img
          src={myCourse.imgUrl}
          className={styles.img}
          alt={myCourse.title}
        />
      </Link>
      <div>
        <h2>{myCourse.title}</h2>
        <p>{myCourse.createdDate}</p>
        <p>{myCourse.content}</p>
        <p>{myCourse.likeCount}</p>
      </div>
    </div>
  );
};

export default MyCourseItem;
