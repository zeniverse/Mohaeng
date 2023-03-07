import { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import Sidebar from "@/src/components/Mypage/Sidebar";
import { BookmarkItem } from "@/src/interfaces/Bookmark";
import CourseBookmarkList from "@/src/components/Bookmark/CourseBookmarkList";

const bookmarks: BookmarkItem[] = [
  {
    id: "1",
    name: "북마크 장소 1",
    imageUrl: "https://via.placeholder.com/200",
    rating: 4.5,
  },
  {
    id: "2",
    name: "북마크 장소 2",
    imageUrl: "https://via.placeholder.com/200",
    rating: 3.5,
  },
  {
    id: "3",
    name: "북마크 장소 3",
    imageUrl: "https://via.placeholder.com/200",
    rating: 2.5,
  },
];

const mybookmark = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <h1 className={styles.Title}>즐겨찾기</h1>
        <CourseBookmarkList bookmarks={filteredBookmarks} />
      </div>
    </div>
  );
};

export default mybookmark;
