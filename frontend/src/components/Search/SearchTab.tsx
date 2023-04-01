import { useRouter } from "next/router";
import { useState } from "react";
import SearchCourse from "./SearchCourse";
import SearchPlace from "./SearchPlace";
import styles from "./SearchTab.module.css";

export default function SearchTab() {
  const router = useRouter();
  const { keyword } = router.query;
  const [activeTab, setActiveTab] = useState(0);
  const menuArr = [{ name: "여행지" }, { name: "코스" }];

  const selectMenuHandler = (index: React.SetStateAction<number>) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    setActiveTab(index);
    if (index === 0) {
      return <SearchPlace />;
    } else if (index === 1) {
      return <SearchCourse />;
    }
  };

  return (
    <>
      <ul className={styles.tabmenu}>
        {menuArr.map((menu, index) => (
          <li
            key={index}
            className={index === activeTab ? styles.activetab : styles.subtab}
            onClick={() => selectMenuHandler(index)}
          >
            {menu.name}
          </li>
        ))}
      </ul>
    </>
  );
}
