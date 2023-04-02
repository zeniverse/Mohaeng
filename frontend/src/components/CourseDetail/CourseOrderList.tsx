import Image from "next/image";
import styles from "./CourseOrderList.module.css";

const CourseOrderList = ({ places }: any) => {
  return (
    <ol className={styles["course-List"]}>
      {places.map((place: any, idx: any) => (
        <li className={styles["course-item"]} key={place.placeId}>
          <span className={styles["order-number"]}>{idx + 1}</span>
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
              <span className={styles.address}>주소: {place.address}</span>
            </div>
            <button
              className={styles.button}
              onClick={() => console.log("자세히보기")}
            >
              자세히 보기
            </button>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default CourseOrderList;
