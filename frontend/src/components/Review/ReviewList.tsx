import styles from "./ReviewList.module.css";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import ReviewItem from "./ReviewItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { setReview } from "@/src/store/reducers/reviewSlice";
import Pagebar from "../Pagenation/Pagebar";

// 해당 여행지 총 리뷰 건수, 별점 데이터 가져오기
// 정렬 필터 (별점 순)
// 리뷰 전체 조회
// 이미지 개수에 따라 배열 돌리기

interface Review {
  memberName: string;
  // 프로필 url 추가
  content: string;
  imgUrl: [];
  overview: string;
  rating: string;
  review: string;
}

export default function Review() {
  const router = useRouter();
  const { id, name } = router.query;
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [selectedValue, setSelectedValue] = useState("default");
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.page.page);
  const totalPages: number = useSelector(
    (state: RootState) => state.searchPlace.totalPages
  );

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.get(`/api/review/${id}`);
        dispatch(setReview(res.data.data));
        const { reviews } = res.data.data;
        setReviewData(reviews);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReview();
  }, [id, page]);

  return (
    <>
      <section className={styles.reviewSection}>
        <main className={styles.reviewContainer}>
          <div className={styles.reviewTitle}>
            <div className={styles.titleBox}>
              <h2 className={styles.h2}>리뷰</h2>
            </div>
            <Link
              className={styles.reviewBtn}
              href={{
                pathname: "/review/create-review",
                query: {
                  name: name,
                  id: id,
                },
              }}
              as={`/review/create-review`}
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
              {/* 내림차순 */}
              <option value="ratingDesc">별점 높은 순</option>
              {/* 오름차순 */}
              <option value="ratingAsc">별점 낮은 순</option>
            </select>
          </aside>
          <div className={styles.reviewList}>
            {reviewData?.map((review) => (
              <ReviewItem
                memberName={review.memberName}
                rating={review.rating}
                content={review.content}
                imgUrl={review.imgUrl}
              />
            ))}
          </div>
        </main>
      </section>
      <Pagebar totalPage={totalPages} />
    </>
  );
}

// 좋아요순 정렬
// function compareLikes(a, b) {
//   return b.likeCount - a.likeCount;
// }

// // 데이터 받아오는 코드

// data.sort(compareLikes);

// // 좋아요 순으로 정렬된 데이터 사용하는 코드
