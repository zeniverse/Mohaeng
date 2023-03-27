import styles from "./PlaceItem.module.css";
import Image from "next/image";
import { BiBookmarkPlus } from "react-icons/bi";
import Link from "next/link";
import { PlaceProps } from "@/src/interfaces/Place";

const PlaceItem = ({ id, placeTitle, placeImg, placeRating }: PlaceProps) => {
  return (
    <div className={styles["place-item-container"]}>
      <Link href={`/place/${id}`}>
        <div className={styles["item-info-container"]}>
          <div className={styles["item-image"]}>
            <div className={styles["item-image-box"]}></div>
            <Image
              src={placeImg}
              alt={placeTitle}
              width={700}
              height={700}
              priority
            />
          </div>
          <div className={styles["item-nav-container"]}>
            <div className={styles["item-nav"]}>{placeRating}</div>
            <div className={styles["item-nav"]}>
              <BiBookmarkPlus />
            </div>
          </div>
        </div>
      </Link>
      <div>
        <div className={styles["item-info-text"]}>
          <h3> {placeTitle}</h3>
        </div>
      </div>
    </div>
  );
};

export default PlaceItem;
