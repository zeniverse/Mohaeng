import Link from "next/link";
import styles from "./Review.module.css";
import ReviewBox from "./ReviewBox";

export default function Review() {
  return (
    <>
      <section className={styles.review}>
        <div className={styles.reviewContainer}>
          <div className={styles.reviewTitle}>
            <div className={styles.titleBox}>
              <h2 className={styles.h1}>리뷰</h2>
            </div>
            <Link className={styles.reviewBtn} href="/registerReview">
              리뷰 작성
            </Link>
          </div>

          <aside className={styles.reviewNav}>
            <div className={styles.reviewInfo}>
              <p>총 리뷰 건수</p>
              <span>평균 별점</span>
            </div>
            <select className={styles.select} name="sort">
              <option value="" selected>
                정렬 ▼
              </option>
              <option value="newest">최신순</option>
              <option value="popular">추천순</option>
            </select>
          </aside>

          <ReviewBox />
          <ReviewBox />
          <ReviewBox />
          <ReviewBox />
          <ReviewBox />
          <ReviewBox />
          <ReviewBox />
          <ReviewBox />
          <ReviewBox />
          <ReviewBox />
          <ReviewBox />
        </div>
      </section>
    </>
  );
}
