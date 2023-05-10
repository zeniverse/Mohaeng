import styles from "./PlaceCard.module.css";
import React from "react";
import { ITopTenPlace } from "@/src/interfaces/Place";
import Image from "next/image";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import { useRouter } from "next/router";

const PlaceCard = ({
  placeId,
  name,
  firstImage,
  averageRating,
}: ITopTenPlace) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/place/${placeId}`);
  };
  return (
    <div className={styles["place-card-container"]} onClick={handleCardClick}>
      <div className={styles["place-image-container"]}>
        <Image src={firstImage} alt={name} width={700} height={700} priority />
      </div>
      <div className={styles["place-card-content"]}>
        <span className={styles["card-name"]}>{name}</span>
        <FiveStarRating rating={averageRating} />
      </div>
    </div>
  );
};

export default PlaceCard;
