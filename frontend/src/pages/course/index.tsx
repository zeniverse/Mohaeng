import styles from "./index.module.css";
import { BiPencil } from "react-icons/bi";
import CourseList from "@/src/components/Course/CourseList";
import { useRouter } from "next/router";
import AreaSelector from "@/src/components/Filter/AreaSelector";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import SelectSorting from "@/src/components/Course/SelectSorting";
import SearchKeyword from "@/src/components/Course/SearchKeyword";
import { openModal } from "@/src/store/reducers/modalSlice";

export default function Course() {
  const router = useRouter();
  const { id: userId } = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();
  const handleCreateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userId) {
      router.push("course/create-course");
    } else {
      dispatch(
        openModal({
          modalType: "LoginModal",
          isOpen: true,
        })
      );
    }
  };

  return (
    <main className={styles.main}>
      <h1>코스</h1>
      <div className={styles["filter-container"]}>
        <AreaSelector />
        <div className={styles["course-filter-wrapper"]}>
          <div className={styles.filter}>
            <SearchKeyword />
            <SelectSorting />
          </div>
          <button className={styles["write-btn"]} onClick={handleCreateClick}>
            <BiPencil />
            코스 작성
          </button>
        </div>
      </div>
      <CourseList />
    </main>
  );
}
