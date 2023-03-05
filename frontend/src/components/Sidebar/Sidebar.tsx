import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles["sidebar"]}>
      <ul>
        <div className={styles["sidebar__list"]}>
          <Link href="/mypage" style={{ textDecoration: "none" }}>
            <button className={styles["sidebar__button"]}>회원정보</button>
          </Link>
        </div>

        <div className={styles["sidebar__list"]}>
          <Link href="/favorites" style={{ textDecoration: "none" }}>
            <button className={styles["sidebar__button"]}>즐겨찾기</button>
          </Link>
        </div>
        <div className={styles["sidebar__list"]}>
          <Link href="/trips" style={{ textDecoration: "none" }}>
            <button className={styles["sidebar__button"]}>
              나의 여행 일정
            </button>
          </Link>
        </div>
        <div className={styles["sidebar__list"]}>
          <Link href="/comments" style={{ textDecoration: "none" }}>
            <button className={styles["sidebar__button"]}>내가 쓴 댓글</button>
          </Link>
        </div>
        <div className={styles["sidebar__list"]}>
          <Link href="/posts" style={{ textDecoration: "none" }}>
            <button className={styles["sidebar__button"]}>
              내가 쓴 게시글
            </button>
          </Link>
        </div>
        <div className={styles["sidebar__list"]}>
          <Link href="/activity" style={{ textDecoration: "none" }}>
            <button className={styles["sidebar__button"]}>내 활동 알림</button>
          </Link>
        </div>
        <div className={styles["sidebar__list"]}>
          <Link href="/requests" style={{ textDecoration: "none" }}>
            <button className={styles["sidebar__button"]}>요청한 장소</button>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
