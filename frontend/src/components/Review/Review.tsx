import Link from "next/link";
import { SetStateAction, useState } from "react";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import styles from "./Review.module.css";
import ReviewBox from "./ReviewBox";

// 해당 여행지 총 리뷰 건수, 별점 데이터 가져오기
// 정렬 필터
export default function Review() {
  const [selectedValue, setSelectedValue] = useState("default");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedValue(e.target.value);
  };

  return (
    <>
      <section className={styles.review}>
        <div className={styles.reviewContainer}>
          <div className={styles.reviewTitle}>
            <div className={styles.titleBox}>
              <h2 className={styles.h2}>리뷰</h2>
            </div>
            <Link
              className={styles.reviewBtn}
              href="/review/create-review"
              scroll={true}
            >
              리뷰 작성
            </Link>
          </div>

          <aside className={styles.reviewNav}>
            <div className={styles.reviewInfo}>
              <p>총 리뷰 건수</p>
              <span>
                <FiveStarRating rating="4" />
              </span>
            </div>
            <select
              className={styles.select}
              value={selectedValue}
              onChange={handleChange}
            >
              <option value="default" selected>
                정렬 ▼
              </option>
              <option value="newest">최신순</option>
              <option value="popular">추천순</option>
            </select>
          </aside>

          <ReviewBox />
        </div>
      </section>
    </>
  );
}
