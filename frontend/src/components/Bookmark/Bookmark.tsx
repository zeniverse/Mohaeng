import styles from "./Bookmark.module.css";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { BiBookmarkPlus } from "react-icons/bi";

type BookmarkProps = {
  bookMarked: boolean;
  onToggle: (bookMarked: boolean) => void;
};

export default function Bookmark({ bookMarked, onToggle }: BookmarkProps) {
  return (
    <button className={styles.btn} onClick={() => onToggle(!bookMarked)}>
      {bookMarked ? (
        <BsFillBookmarkCheckFill className={styles.bookmark} />
      ) : (
        <BiBookmarkPlus className={styles.unbookmark} />
      )}
    </button>
  );
}
