import styles from "./PlaceCard.module.css";
import React from "react";
import { PlaceProps } from "@/src/interfaces/Place";
import Image from "next/image";

const PlaceCard = (props: PlaceProps) => {
  const { id, placeImg, placeDesc, placeTitle, placeRating } = props;
  return (
    <div className={styles["place-card-container"]}>
      <div className={styles["place-image-container"]}>
        <Image
          src={placeImg}
          alt={placeTitle}
          width={700}
          height={700}
          priority
        />
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
