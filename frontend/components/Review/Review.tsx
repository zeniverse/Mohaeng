import Link from "next/link";
import React from "react";
import styles from "./Review.module.css";

export default function Review() {
  return (
    <>
      <section className={styles.review}>
        <article className={styles.reviewContainer}>
          <div className={styles.reviewTitle}>
            <div className={styles.titleBox}>
              <h1 className={styles.h1}>리뷰</h1>
              <p> 총 10건의 리뷰</p>
            </div>
            <Link className={styles.reviewBtn} href="/registerReview">
              리뷰 작성
            </Link>
          </div>
          <div className={styles.reviewBox}>
            <div className={styles.reviewContent}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              culpa nam dicta, laborum modi delectus ratione similique inventore
              quibusdam saepe facere eaque perferendis qui quas rem vel
              corporis? Obcaecati, incidunt.
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
