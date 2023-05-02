import { useAppSelector } from "@/src/hooks/useReduxHooks";
import { useRouter } from "next/router";
import React from "react";
import KakaoMap from "../KakaoMap/KakaoMap";
import TagItem from "../UI/TagItem";

import styles from "./CourseDetailContent.module.css";
import CourseOrderList from "./CourseOrderList";

const CourseDetailContent = () => {
  const courseDetail = useAppSelector((state) => state.courseDetail.course);
  const { content, places } = courseDetail;

  return (
    <div className={styles["content-container"]}>
      <div className={styles.content}>
        {content?.split("\n").map((line, index) => {
          return (
            <div key={index}>
              {line}
              <br />
            </div>
          );
        })}
      </div>

      {/* <p className={styles.content}>{formattedData}</p> */}
      <div className={styles.info}>
        {places && places.length > 0 && <KakaoMap mapData={places} />}
        {places && places.length > 0 && <CourseOrderList places={places} />}
      </div>
    </div>
  );
};

export default CourseDetailContent;
