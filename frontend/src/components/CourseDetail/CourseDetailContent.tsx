import { useRouter } from "next/router";
import React from "react";
import KakaoMap from "../KakaoMap/KakaoMap";

import styles from "./CourseDetailContent.module.css";
import CourseOrderList from "./CourseOrderList";

const CourseDetailContent = ({ mapData, content, places }: any) => {
  const handleClick = () => {};

  return (
    <div className={styles["content-container"]}>
      <p className={styles.content}>{content}</p>
      <div className={styles.info}>
        {mapData && mapData.length > 0 && <KakaoMap mapData={mapData} />}

        <div className={styles.list}>
          <CourseOrderList places={places} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailContent;
