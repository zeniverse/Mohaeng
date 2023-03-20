import { BookmarkItem } from "@/src/interfaces/Bookmark";
import styles from "./index.module.css";

interface MyCourseItemProps {
  bookmark: BookmarkItem;
}

const MyCourseItem = ({ bookmark }: MyCourseItemProps) => {
  return (
    <div key={bookmark.id} className={styles["bookmark-item"]}>
      <img src={bookmark.imageUrl} alt={bookmark.name} />
      <div>
        <h2>{bookmark.name}</h2>
        <p>{bookmark.description}</p>
      </div>
    </div>
  );
};

export default MyCourseItem;
