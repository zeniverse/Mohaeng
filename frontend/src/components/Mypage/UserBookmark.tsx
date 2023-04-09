import styles from "./UserBookmark.module.css";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { BiBookmark } from "react-icons/bi";
import UserBookmarkItem from "./UserBookmarkItem";

const UserBookmark = () => {
  const courseBookmark = useSelector(
    (state: RootState) => state.courseBookmark.data
  );
  const placeBookmark = useSelector(
    (state: RootState) => state.placeBookmark.data
  );

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
        {activeTab === "place"
          ? placeBookmark.map((bookmark) => (
              <UserBookmarkItem
                id={bookmark.bookMarkId}
                name={bookmark.placeName}
                image={bookmark.imgUrl}
                desc={bookmark.address}
              />
            ))
          : courseBookmark.map((bookmark) => (
              <UserBookmarkItem
                id={bookmark.bookMarkId}
                name={bookmark.courseTitle}
                image={bookmark.courseStatus}
                desc={bookmark.region}
              />
            ))}
      </div>
    </>
  );
};

export default UserBookmark;
