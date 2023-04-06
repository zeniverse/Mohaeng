import styles from "./index.module.css";
import { BiPencil } from "react-icons/bi";
import CourseList from "@/src/components/Course/CourseList";
import { useRouter } from "next/router";
import AreaSelector from "@/src/components/Filter/AreaSelector";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { KeyboardEvent, useState } from "react";
import { clearKeyword, setKeyword } from "@/src/store/reducers/FilterSlice";
import ResetButton from "@/src/components/UI/ResetButton";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function Course() {
  const router = useRouter();
  const handleCreateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("course/create-course");
  };

  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    dispatch(setKeyword(searchValue));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const resetHandler = () => {
    setSearchValue("");
    dispatch(clearKeyword());
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  // 검색하고 돌아오면 검색 내역 그대로 남음.

  return (
    <main className={styles.main}>
      <div className={styles["course-container"]}>
        <div className={styles["course-header-container"]}>
          <h1>코스 목록</h1>
        </div>
        <AreaSelector />
        <div className={styles["course-wrapper"]}>
          <div className={styles["filter-wrapper"]}>
            <div className={styles.keyword}>
              <h4>키워드 검색</h4>
              <div className={styles["input-box"]}>
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <button className={styles["search-btn"]} onClick={handleSearch}>
                  검색
                </button>
                <ResetButton onClick={resetHandler} />
              </div>
            </div>
            <div className={styles.sort}>
              <h4>정렬</h4>
              <button className={styles["dropdown-label"]}>
                최신순
                <MdOutlineKeyboardArrowDown />
              </button>
              <div className={styles["dropdown-content"]}>
                <ul>좋아요순</ul>
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <button className={styles["write-btn"]} onClick={handleCreateClick}>
              <BiPencil />
              작성하기
            </button>
          </div>
        </div>
        <div className={styles["course-body-container"]}>
          <CourseList />
        </div>
      </div>
    </main>
  );
}
