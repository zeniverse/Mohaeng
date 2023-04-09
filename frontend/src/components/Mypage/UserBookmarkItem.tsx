import FiveStarRating from "../FiveStarRating/FiveStarRating";
import styles from "./UserBookmarkItem.module.css";

export interface bookmarkState {
  id: number;
  image: string;
  name: string;
  desc: string;
  rating: number;
  isRating: boolean;
}

const UserBookmarkItem = (prop: bookmarkState) => {
  return (
    <div key={prop.id} className={styles["bookmark-item"]}>
      <img src={prop.image} alt={prop.image} />
      <div>
        <h2>{prop.name}</h2>
        <p>{prop.desc}</p>
        {prop.isRating === true ? (
          <p>
            <FiveStarRating rating={prop.rating.toString()} />
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default UserBookmarkItem;
