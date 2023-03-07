import styles from "./ReviewBox.module.css";

export default function () {
  return (
    <article className={styles.reviewBox}>
      <div className={styles.reviewerInfo}>
        <img src="/public/assets/user.png" />
        유저이미지, 별점, 아이디 | 작성일
        <div className={styles.btnGroup}>
          <button className={styles.modifyBtn}>수정</button>
          <button className={styles.deleteBtn}>삭제</button>
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
        <button className={styles.likeBtn}>좋아요</button>
      </div>
    </article>
  );
}
