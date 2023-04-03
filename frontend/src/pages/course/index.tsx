import styles from "./index.module.css";
import { BiPencil } from "react-icons/bi";
import CourseList from "@/src/components/Course/CourseList";
import { useRouter } from "next/router";
import AreaSelector from "@/src/components/Filter/AreaSelector";

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
        <div className={styles["course-body-container"]}>
          <div className={styles["course-body-head"]}>
            <button className={styles["write-btn"]} onClick={handleCreateClick}>
              <BiPencil />
              작성하기
            </button>
          </div>
          {/* <CourseFilter /> */}
          <CourseList />
        </div>
      </div>
    </main>
  );
}
