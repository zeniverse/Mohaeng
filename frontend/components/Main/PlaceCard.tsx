import styles from "./PlaceCard.module.css";
import React from "react";

type PlaceProps = {
  id: string;
  placeImg: string;
  placeTitle: string;
  placeDesc: string;
  placeRating: string;
};

const PlaceCard = ({
  id,
  placeImg,
  placeDesc,
  placeTitle,
  placeRating,
}: PlaceProps) => {
  return (
    <div className={styles["placecard-container"]}>
      <div className={styles["image-container"]}>
        <img src={placeImg} alt={placeTitle} />
      </div>
      <div className={styles["placecard-content"]}>
        <div className={styles["placecard-rating"]}>{`⭐ ${placeRating}`}</div>
        <div className={styles["placecard-title"]}>
          <h3>{placeTitle}</h3>
        </div>
        <div className={styles["placecard-desc"]}>
          <p>{placeDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
