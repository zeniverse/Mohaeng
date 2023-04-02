import { CourseListProps } from "@/src/interfaces/Course";
import styles from "./CourseItem.module.css";
import React, { useState } from "react";
import Image from "next/image";

import { BiMapAlt, BiShareAlt, BiBookmarkPlus } from "react-icons/bi";
import RoughMap from "./RoughMap";
import IsLikeState from "../UI/IsLikeState";
import Link from "next/link";
import TagItem from "../UI/TagItem";

const CourseItem = ({
  id,
  title,
  content,
  likeCount,
  courseDays,
  thumbnailUrl,
  places,
}: CourseListProps) => {
  const [isRoughMapOpen, setIsRoughMapOpen] = useState(false);

  const toggleRoughMapHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setIsRoughMapOpen((prev) => !prev);
  };
  const onClose = () => {
    setIsRoughMapOpen(false);
  };

  return (
    <div className={styles["course-item-container"]}>
      <Link href={`/course/${id}`}>
        <div className={styles["item-info-container"]}>
          <div className={styles["item-image"]}>
            <div className={styles["item-image-box"]}></div>
            <Image
              src={thumbnailUrl}
              alt={title}
              width={700}
              height={700}
              priority
            />
            <IsLikeState courseLike={likeCount} />
          </div>
          <div className={styles["item-info-text"]}>
            <h3>{title}</h3>
            <p>{content}</p>
            {courseDays && <TagItem text={courseDays} />}
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
            <RoughMap RoughMapData={places} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
