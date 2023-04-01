import styles from "./index.module.css";
import { BiPencil } from "react-icons/bi";
import { useRouter } from "next/router";
import PlaceList from "@/src/components/Place/PlaceList";
import PlaceFilter from "@/src/components/Place/PlaceFilter";

export default function Place() {
  const router = useRouter();
  const handleCreateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("course/create-course");
  };
  return (
    <main className={styles.main}>
      <div className={styles["place-container"]}>
        <div className={styles["place-header-container"]}>
          <h1>여행지 목록</h1>
        </div>
        <div className={styles["place-body-container"]}>
          <div className={styles["place-body-head"]}></div>
          <PlaceFilter />
          <PlaceList />
        </div>
      </div>
    </main>
  );
}
