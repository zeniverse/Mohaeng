import styles from "./UserBookmark.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { BiBookmark } from "react-icons/bi";

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
              <div
                key={bookmark.bookMarkId}
                className={styles["bookmark-item"]}
              >
                <img src={bookmark.placeImgUrl} alt={bookmark.placeName} />
                <div>
                  <h2>{bookmark.placeName}</h2>
                  <p>{bookmark.address}</p>
                </div>
              </div>
            ))
          : courseBookmark.map((bookmark) => (
              <div
                key={bookmark.bookMarkId}
                className={styles["bookmark-item"]}
              >
                <img src={bookmark.courseImgUrl} alt={bookmark.courseTitle} />
                <div>
                  <h2>{bookmark.courseTitle}</h2>
                  <p>{bookmark.region}</p>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default UserBookmark;
