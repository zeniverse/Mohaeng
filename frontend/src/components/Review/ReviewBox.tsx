import styles from "./ReviewBox.module.css";
import { FaRegThumbsUp } from "react-icons/fa";
import Image from "next/image";
import user from "../../../public/assets/user.png";

// 별점, 아이디, 작성일
// 내용 더보기 버튼
// 유저일 경우 수정 삭제 버튼
// 좋아요 버튼 클릭 시 +1 -1 값 저장 (리듀서 생성)

export default function () {
  return (
    <article className={styles.reviewBox}>
      <div className={styles.reviewer}>
        <Image
          className={styles.userImg}
          src={user}
          width={50}
          height={50}
          alt="userImg"
        />
        <div className={styles.reviewerInfo}>
          <div className={styles.rating}> 별점 </div>
          <p className={styles.review}>아이디 | 작성일</p>
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn}>수정</button>
          <button className={styles.btn}>삭제</button>
        </div>
      </div>
      <div className={styles.reviewContent}>
        <p className={styles.reviewTxt}>
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil culpa
          nam dicta, laborum modi delectus ratione similique inventore quibusdam
          saepe facere eaque perferendis qui quas rem vel corporis? Obcaecati,
          incidunt. 더보기
        </p>
        <button className={styles.likeBtn}>
          <FaRegThumbsUp />
        </button>
      </div>
    </article>
  );
}
