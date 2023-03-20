import { useState } from "react";
import styles from "./index.module.css";
import { BookmarkItem } from "@/src/interfaces/Bookmark";
import MypageLayout from "../MypageLayout";

const bookmarksPlace: BookmarkItem[] = [
  {
    id: "1",
    name: "bookmark Place 1",
    imageUrl: "https://via.placeholder.com/200",
    description: "Best",
    rating: 4.5,
  },
  {
    id: "2",
    name: "bookmark Place 2",
    imageUrl: "https://via.placeholder.com/200",
    description: "nice",
    rating: 3.5,
  },
  {
    id: "3",
    name: "bookmark Place 3",
    imageUrl: "https://via.placeholder.com/200",
    description: "So so.",
    rating: 2.5,
  },
];

const bookmarksCourse: BookmarkItem[] = [
  {
    id: "4",
    name: "bookmark Course 1",
    imageUrl: "https://via.placeholder.com/200",
    description: "Best",
    rating: 4.5,
  },
  {
    id: "5",
    name: "bookmark Course 2",
    imageUrl: "https://via.placeholder.com/200",
    description: "nice",
    rating: 3.5,
  },
  {
    id: "6",
    name: "bookmark Course 3",
    imageUrl: "https://via.placeholder.com/200",
    description: "So so.",
    rating: 2.5,
  },
];

const MyPost = () => {
  // const [bookmarks, setBookmarks] = useState<bookmarkItem[]>([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(
  //       "http://localhost:3000/api/myPage/course/bookMark"
  //     );
  //     const data = await res.json();
  //     setBookmarks(data);
  //     console.log(data);
  //   }
  //   fetchData();
  // }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("place");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  let bookmarks: BookmarkItem[];
  let tabName: string;

  if (activeTab === "place") {
    bookmarks = bookmarksPlace;
    tabName = "Place";
  } else {
    bookmarks = bookmarksCourse;
    tabName = "Travel Destination";
  }

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MypageLayout>
      <h1 className={styles.Title}>내가 쓴 글</h1>
      <div className={styles.container}>
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${
              activeTab === "place" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("place")}
          >
            내가 쓴 게시글
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "course" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("course")}
          >
            내가 쓴 댓글
          </div>
        </div>
        <div className={styles["bookmark-container"]}>
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
    </MypageLayout>
  );
};

export default MyPost;
