import styles from "./index.module.css";
import { BiPencil } from "react-icons/bi";
import CourseList from "@/src/components/Course/CourseList";
import { useRouter } from "next/router";
import AreaSelector from "@/src/components/Filter/AreaSelector";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import { KeyboardEvent, useState } from "react";
import { clearKeyword, setKeyword } from "@/src/store/reducers/FilterSlice";
import ResetButton from "@/src/components/UI/ResetButton";
import SelectSorting from "@/src/components/Course/SelectSorting";
import SearchKeyword from "@/src/components/Course/SearchKeyword";

export default function Course() {
  const router = useRouter();
  const handleCreateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("course/create-course");
  };

  return (
    <main className={styles.main}>
      <div className={styles["course-container"]}>
        <div className={styles["course-header-container"]}>
          <h1>코스 목록</h1>
        </div>
        <AreaSelector />
        <div className={styles["course-wrapper"]}>
          <div className={styles["filter-wrapper"]}>
            <SearchKeyword />
            <SelectSorting />
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
