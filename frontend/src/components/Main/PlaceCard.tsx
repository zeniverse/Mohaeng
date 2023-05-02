import styles from "./PlaceCard.module.css";
import React from "react";
import { ITopTenPlace } from "@/src/interfaces/Place";
import Image from "next/image";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import { useRouter } from "next/router";

const PlaceCard = ({
  placeId,
  contentId,
  name,
  firstImage,
  averageRating,
}: ITopTenPlace) => {
  const router = useRouter();

  const handleClickBtn = () => {
    router.push(
      {
        pathname: `/place/[id]`,
        query: {
          placeId: placeId,
          contentId: contentId,
          name: name,
        },
      },
      `/place/${contentId}`
    );
  };
  return (
    <div className={styles["place-card-container"]} onClick={handleClickBtn}>
      <div className={styles["place-image-container"]}>
        <Image src={firstImage} alt={name} width={700} height={700} priority />
      </div>
      <div className={styles["place-card-content"]}>
        <FiveStarRating rating={averageRating} />
        <div className={styles["place-card-title"]}>
          <h3>{name}</h3>
        </div>
        <div className={styles["place-card-desc"]}></div>
      </div>
    </div>
  );
};

export default PlaceCard;
