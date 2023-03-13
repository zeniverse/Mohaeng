import { useState } from "react";
import styles from "./index.module.css";
import { BookmarkItem } from "@/src/interfaces/Bookmark";
import MyPageLayout from "@/src/components/Layout/MypageLayout";

const bookmarks: BookmarkItem[] = [
  {
    id: "1",
    name: "북마크 장소 1",
    imageUrl: "https://via.placeholder.com/200",
    description: "이 장소는 멋진 곳입니다.",
    rating: 4.5,
  },
  {
    id: "2",
    name: "북마크 장소 2",
    imageUrl: "https://via.placeholder.com/200",
    description: "이 장소는 좋은 곳입니다.",
    rating: 3.5,
  },
  {
    id: "3",
    name: "북마크 장소 3",
    imageUrl: "https://via.placeholder.com/200",
    description: "이 장소는 보통입니다.",
    rating: 2.5,
  },
];

const MyBookmark = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MyPageLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>즐겨찾기</h1>
        <hr />
        <div>
          {filteredBookmarks.map((bookmark) => (
            <div key={bookmark.id} className={styles["bookmark-item"]}>
              <img src={bookmark.imageUrl} alt={bookmark.name} />
              <div>
                <h2>{bookmark.name}</h2>
                <p>{bookmark.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MyPageLayout>
  );
};

export default MyBookmark;
