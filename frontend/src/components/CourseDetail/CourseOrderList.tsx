import Image from "next/image";
import styles from "./CourseOrderList.module.css";
import { AiOutlineMinus } from "react-icons/ai";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { removePlace } from "@/src/store/reducers/CourseFormSlice";

const CourseOrderList = ({ places, mode }: any) => {
  const dispatch = useAppDispatch();
  const handleRemovePlace = (placeId: number) => {
    dispatch(removePlace(placeId));
  };
  return (
    <div className={styles["course-orderlist-container"]}>
      <ol className={styles["course-list"]}>
        {places.map((place: any, idx: any) => (
          <li className={styles["course-item"]} key={place.placeId}>
            <p className={styles["order-number"]}>{idx + 1}</p>
            <Image
              src={place.imgUrl}
              alt={place.name}
              width={126}
              height={110}
              priority
            />
            <div className={styles["item-content"]}>
              <div className={styles["item-content-text"]}>
                <p className={styles.name}>{place.name}</p>
                <p className={styles.address}>주소: {place.address}</p>
              </div>
              <button
                className={styles.button}
                onClick={() => console.log("자세히보기")}
              >
                자세히 보기
              </button>
            </div>
            {mode === "write" && (
              <div className={styles["remove-btn-wrapper"]}>
                <div
                  className={styles["remove-btn"]}
                  onClick={() => handleRemovePlace(place.placeId)}
                >
                  <AiOutlineMinus />
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CourseOrderList;
