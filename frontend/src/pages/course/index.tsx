import CourseList from "@/src/components/Course/CourseList";
import styles from "./index.module.css";
import { BiPencil } from "react-icons/bi";
import CourseFilter from "@/src/components/Course/CourseFilter";

export default function Course() {
  return (
    <main className={styles.main}>
      <div className={styles["course-container"]}>
        <div className={styles["course-header-container"]}>
          <h1>코스 목록</h1>
        </div>
        <div className={styles["course-body-container"]}>
          <div className={styles["course-body-head"]}>
            <button className={styles["write-btn"]}>
              <BiPencil />
              작성하기
            </button>
          </div>
          <CourseFilter />
          <CourseList />
        </div>
      </div>
    </main>
  );
}
