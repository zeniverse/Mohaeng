import React from "react";
import KakaoMap from "../KakaoMap/KakaoMap";

import styles from "./CourseDetailContent.module.css";
import CourseOrderList from "./CourseOrderList";

const CourseDetailContent = ({ positions, content, places, router }: any) => {
  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className={styles["content-container"]}>
      <p className={styles.content}>{content}</p>
      <div className={styles.map}>
        {positions && positions.length > 0 && (
          <KakaoMap positions={positions} />
        )}
        <div className={styles.info}>
          <CourseOrderList places={places} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailContent;
