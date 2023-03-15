import { CourseProps } from "@/src/interfaces/Course";
import styles from "./CourseItem.module.css";
import React, { useState } from "react";
import Image from "next/image";

import { BiMapAlt, BiShareAlt, BiBookmarkPlus } from "react-icons/bi";
import RoughMap from "./RoughMap";
import IsLikeState from "../UI/IsLikeState";

const CourseItem = ({
  id,
  courseTitle,
  courseDesc,
  courseLike,
  courseDays,
  courseList,
}: CourseProps) => {
  const [isRoughMapOpen, setIsRoughMapOpen] = useState(false);
  const RoughMapData: string[] = courseList?.map((course) => course.title);

  const toggleRoughMapHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setIsRoughMapOpen((prev) => !prev);
  };

  const Img = courseList[0].imgUrl;
  return (
    <div className={styles["course-item-container"]}>
      <div className={styles["item-info-container"]}>
        <div className={styles["item-image"]}>
          <div className={styles["item-image-box"]}></div>
          <Image
            src={Img}
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
