import Image from "next/image";
import styles from "./CourseOrderList.module.css";
import { AiOutlineMinus } from "react-icons/ai";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { removePlace } from "@/src/store/reducers/CourseFormSlice";
import TagItem from "../UI/TagItem";
import React from "react";
import { IPlace } from "@/src/interfaces/Course.type";
const CourseOrderList = ({ places, mode }: any) => {
  const dispatch = useAppDispatch();
  const handleRemovePlace = (placeId: number) => {
    dispatch(removePlace(placeId));
  };

  return (
    <div className={styles["course-orderlist-container"]}>
      <ol className={styles["course-list"]}>
        {places.map((place: IPlace, idx: any) => (
          <li className={styles["course-item"]} key={place.placeId}>
            <p className={styles["order-number"]}>{idx + 1}</p>
            {place.imgUrl ? (
              <Image
                className={styles.img}
                src={place.imgUrl}
                alt={place.name}
                width={130}
                height={110}
                priority
              />
            ) : (
              <p>이미지 준비 중</p>
            )}
            <div className={styles["item-content"]}>
              <p className={styles.name}>{place.name}</p>
              <TagItem color="black" size="SS" text="주소" bgColor="Mgrey" />
              <span className={styles.address}>{place.address}</span>
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

export default React.memo(CourseOrderList);
