import styles from "./PlaceCard.module.css";
import React from "react";
import { PlaceProps } from "@/interfaces/Place";

const PlaceCard = (props: PlaceProps) => {
  const { id, placeImg, placeDesc, placeTitle, placeRating } = props;
  return (
    <div className={styles["place-card-container"]}>
      <div className={styles["place-image-container"]}>
        <img src={placeImg} alt={placeTitle} />
      </div>
      <div className={styles["place-card-content"]}>
        <div className={styles["place-card-rating"]}>{`⭐ ${placeRating}`}</div>
        <div className={styles["place-card-title"]}>
          <h3>{placeTitle}</h3>
        </div>
        <div className={styles["place-card-desc"]}>
          <p>{placeDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
