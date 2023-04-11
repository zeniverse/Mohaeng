"use client";
import Link from "next/link";
import styles from "./MyCourseItem.module.css";
import { useState } from "react";

export interface MyCourseItemProps {
  courseId: number;
  imgUrl: string;
  title: string;
  likeCount: number;
  createdDate: string;
  content: string;
  courseDays: string;
  courseStatus: string;
}

const MyCourseItem = (myCourse: MyCourseItemProps) => {
  const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  };

  const toggleSwitchclassName =
    myCourse.courseStatus === "PUBLIC"
      ? `${styles["toggle-switch"]} ${styles.publish}`
      : `${styles["toggle-switch"]} ${styles.private}`;
  const textclassName =
    myCourse.courseStatus === "PUBLIC"
      ? `${styles["toggle-switch-text"]} ${styles.publish}`
      : `${styles["toggle-switch-text"]} ${styles.private}`;

  const onChange = () => {
    console.log("A");
  };

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
        <label htmlFor="isPublished" className={styles["publish-label"]}>
          <span className={textclassName}>
            {myCourse.courseStatus === "PUBLIC" ? "공개" : "비공개"}
          </span>
          <div className={toggleSwitchclassName}>
            <input
              id="isPublished"
              type="checkbox"
              name="isPublished"
              checked={myCourse.courseStatus === "PUBLIC"}
              onChange={onChange}
              className={styles.input}
            />
          </div>
        </label>
        <h2>{myCourse.title}</h2>
        <p>{getFormattedDate(new Date(myCourse.createdDate))}</p>
        <p>{myCourse.content}</p>
        <p>{myCourse.likeCount}</p>
      </div>
    </div>
  );
};

export default MyCourseItem;
