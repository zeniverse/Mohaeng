import { BookmarkItem } from "@/src/interfaces/Bookmark";
import styles from "./CourseBookmarkList.module.css";

const CourseBookmarkList = ({ bookmarks }: { bookmarks: BookmarkItem[] }) => {
  return (
    <div className={styles.bookmarkList}>
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className={styles.bookmarkItem}>
          <img
            src={bookmark.imageUrl}
            alt={bookmark.name}
            className={styles.bookmarkItemImage}
          />
          <div className={styles.bookmarkItemContent}>
            <h2 className={styles.bookmarkItemTitle}>{bookmark.name}</h2>
            <div className={styles.bookmarkItemRating}>{bookmark.rating}점</div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CourseBookmarkList;
