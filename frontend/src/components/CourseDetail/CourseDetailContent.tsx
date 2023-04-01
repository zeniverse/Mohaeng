import React from "react";
import KakaoMap from "../KakaoMap/KakaoMap";
import Image from "next/image";

import styles from "./CourseDetailContent.module.css";

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
          <ol className={styles["course-List"]}>
            {/* TODO: 컴포넌트화 하기 */}
            {places.map((place: any, idx: any) => (
              <li className={styles["course-item"]} key={place.placeId}>
                <span className={styles.number}>{idx + 1}</span>
                <Image
                  src={place.imgUrl}
                  alt={place.name}
                  width={126}
                  height={110}
                  priority
                />
                <div className={styles["item-content"]}>
                  <div className={styles["item-content-text"]}>
                    <span className={styles.name}>{place.name}</span>
                    <span className={styles.address}>
                      주소: {place.address}
                    </span>
                  </div>
                  <button className={styles.button} onClick={handleClick}>
                    자세히 보기
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailContent;
