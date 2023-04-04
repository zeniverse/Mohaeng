import styles from "./Bookmark.module.css";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

type BookmarkProps = {
  bookMarked: boolean;
  onToggle: (bookMarked: boolean) => void;
};

export default function Bookmark({ bookMarked, onToggle }: BookmarkProps) {
  return (
    <button className={styles.btn} onClick={() => onToggle(!bookMarked)}>
      {bookMarked ? (
        <BsFillBookmarkFill className={styles.bookmark} />
      ) : (
        <BsBookmark className={styles.unbookmark} />
      )}
    </button>
  );
}
