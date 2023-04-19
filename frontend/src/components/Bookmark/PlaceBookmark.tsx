import styles from "./PlaceBookmark.module.css";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

type BookmarkProps = {
  bookMarked: boolean;
  onToggle: (bookMarked: boolean) => void;
};

export default function PlaceBookmark({ bookMarked, onToggle }: BookmarkProps) {
  return (
    <button className={styles.btn} onClick={() => onToggle(!bookMarked)}>
      {bookMarked ? (
        <BsBookmarkFill className={styles.bookmark} />
      ) : (
        <BsBookmark className={styles.unbookmark} />
      )}
    </button>
  );
}
