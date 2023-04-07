import styles from "./Bookmark.module.css";
import {
  BsBookmark,
  BsBookmarkFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { BiBookmarkPlus } from "react-icons/bi";

type BookmarkProps = {
  bookMarked: boolean;
  onToggle: (bookMarked: boolean) => void;
};

export default function Bookmark({ bookMarked, onToggle }: BookmarkProps) {
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
