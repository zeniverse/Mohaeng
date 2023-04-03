import styles from "./PlaceItem.module.css";
import Image from "next/image";
import { BiBookmarkPlus } from "react-icons/bi";
import Link from "next/link";
import { PlaceProps } from "@/src/interfaces/Place";
import { content } from "@/src/store/reducers/PlaceSlice";

const PlaceItem = ({ name, firstImage, areaCode, contentId }: content) => {
  return (
    <div className={styles["place-item-container"]}>
      <Link href={`/place/${contentId}`}>
        <div className={styles["item-info-container"]}>
          <div className={styles["item-image"]}>
            <div className={styles["item-image-box"]}></div>
            <Image
              src={firstImage}
              alt={name}
              width={700}
              height={700}
              priority
            />
          </div>
          <div className={styles["item-nav-container"]}>
            {/* <div className={styles["item-nav"]}>{placeRating}</div> */}
            <div className={styles["item-nav"]}>
              <BiBookmarkPlus />
            </div>
          </div>
        </div>
      </Link>
      <div>
        <div className={styles["item-info-text"]}>
          <h3> {name}</h3>
        </div>
      </div>
    </div>
  );
};

export default PlaceItem;
