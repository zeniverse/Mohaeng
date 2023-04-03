import { useState } from "react";
import SearchCourse from "./SearchCourse";
import SearchPlace from "./SearchPlace";
import styles from "./SearchTab.module.css";

export default function SearchTab() {
  const [activeTab, setActiveTab] = useState("여행지");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
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
      {activeTab === "여행지" && <SearchPlace />}
      {activeTab === "코스" && <SearchCourse />}
    </>
  );
}
