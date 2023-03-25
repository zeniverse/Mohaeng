import { CourseProps } from "@/src/interfaces/Course";
import styles from "./CourseItem.module.css";
import React, { useState } from "react";
import Image from "next/image";

import { BiMapAlt, BiShareAlt, BiBookmarkPlus } from "react-icons/bi";
import RoughMap from "./RoughMap";
import IsLikeState from "../UI/IsLikeState";
import Link from "next/link";

const CourseItem = ({
  id,
  courseTitle,
  courseDesc,
  courseLike,
  courseDays,
  thumbnailUrl,
  courseList,
}: CourseProps) => {
  const [isRoughMapOpen, setIsRoughMapOpen] = useState(false);
  const RoughMapData: any[] = courseList?.map((course) => course.name)!;

  const toggleRoughMapHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setIsRoughMapOpen((prev) => !prev);
  };

  return (
    <div className={styles["course-item-container"]}>
      <Link href={`/course/${id}`}>
        <div className={styles["item-info-container"]}>
          <div className={styles["item-image"]}>
            <div className={styles["item-image-box"]}></div>
            <Image
              src={thumbnailUrl}
              alt={courseTitle}
              width={700}
              height={700}
              priority
            />
            <IsLikeState courseLike={courseLike} />
          </div>
          <div className={styles["item-info-text"]}>
            <h3>{courseTitle}</h3>
            <p>{courseDesc}</p>
            <div className={styles["courseDays-container"]}>
              <span className={styles.courseDays}>{courseDays}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className={styles["item-nav-container"]}>
        <div className={styles["item-nav"]}>
          <BiBookmarkPlus />
        </div>
        <div className={`${styles["item-nav"]} ${styles.center}`}>
          <BiShareAlt />
        </div>
        <div
          className={`${styles["item-nav"]} ${styles.roughmapBtn}`}
          onClick={toggleRoughMapHandler}
        >
          <BiMapAlt />
          {isRoughMapOpen && (
            <RoughMap
              RoughMapData={RoughMapData}
              setIsRoughMapOpen={setIsRoughMapOpen}
              isRoughMapOpen={isRoughMapOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseItem;