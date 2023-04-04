import styles from "./Bookmark.module.css";

import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

interface BookmarkProps {
  isbookMarked: boolean;
}
export default function Bookmark({ isbookMarked, handleBookmarkClick }) {
  return (
    <button className={styles.likeBtn} onClick={handleBookmarkClick}>
      <p className={styles.likeText}>북마크에 추가</p>
      {isbookMarked === true ? (
        <BsFillBookmarkFill className={styles.bookmark} />
      ) : (
        <BsBookmark className={styles.unbookmark} />
      )}
    </button>
  );
}
