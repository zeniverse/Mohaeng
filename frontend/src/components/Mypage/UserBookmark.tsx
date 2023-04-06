import styles from "./UserBookmark.module.css";
import { useState } from "react";

const UserBookmark = () => {
  const [activeTab, setActiveTab] = useState("place");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className={styles.tabContainer}>
        <div
          className={`${styles.tab} ${
            activeTab === "place" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("place")}
        >
          여행지
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === "course" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("course")}
        >
          코스
        </div>
      </div>
      <div className={styles["bookmark-container"]}>
        {/* {filteredBookmarks.map((bookmark) => (
          <div key={bookmark.id} className={styles["bookmark-item"]}>
            <img src={bookmark.imageUrl} alt={bookmark.name} />
            <div>
              <h2>{bookmark.name}</h2>
              <p>{bookmark.description}</p>
            </div>
          </div>
        ))} */}
      </div>
    </>
  );
};

export default UserBookmark;
