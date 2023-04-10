import { useEffect, useState } from "react";
import SearchCourseList from "./SearchCourseList";
import SearchPlaceList from "./SearchPlaceList";
import styles from "./SearchTab.module.css";

export default function SearchTab() {
  const [activeTab, setActiveTab] = useState("여행지");

  useEffect(() => {
    const tab = localStorage.getItem("activeTab");
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <>
      <ul className={styles.tabmenu}>
        <li
          className={`${
            activeTab === "여행지" ? styles.activetab : styles.subtab
          }`}
          onClick={() => handleTabClick("여행지")}
        >
          여행지
        </li>
        <li
          className={`${
            activeTab === "코스" ? styles.activetab : styles.subtab
          }`}
          onClick={() => handleTabClick("코스")}
        >
          코스
        </li>
      </ul>
      {activeTab === "여행지" && <SearchPlaceList />}
      {activeTab === "코스" && <SearchCourseList />}
    </>
  );
}
