import styles from "./ReviewList.module.css";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import ReviewItem from "./ReviewItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { data, setReview } from "@/src/store/reducers/reviewSlice";
import Pagebar from "../Pagenation/Pagebar";

// 해당 여행지 총 리뷰 건수, 평균 별점 데이터 가져오기
// 정렬 필터 (별점 순)
// 리뷰 전체 조회
// 이미지 개수에 따라 배열 돌리기

interface Review {
  id: number;
  nickname: string;
  memberImage: string;
  content: string;
  // imgUrl: [];
  rating: number;
}

export default function ReviewList() {
  const router = useRouter();
  const { placeId, name } = router.query;
  const [reviewData, setReviewData] = useState<data[]>([]);
  const [selectedValue, setSelectedValue] = useState("default");
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.page.page);
  const totalPages: number = useSelector(
    (state: RootState) => state.searchPlace.totalPages
  );
  const currentUser = useSelector(
    (state: RootState) => state.nickName.nickName
  );
  console.log(currentUser);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.get(`/api/review/${placeId}`);
        dispatch(setReview(res.data));
        const { data } = res.data;
        setReviewData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReview();
  }, [placeId, page]);

  const handleClickReviewBtn = () => {
    // if (!currentUser) {
    //   router.push("/login");
    // } else if (currentUser) {
    //   window.alert("여행지별로 리뷰는 한 번만 작성할 수 있습니다.");
    // } else if (currentUser === "") {
    router.push(
      {
        pathname: "/review/create-review",
        query: {
          plcaceId: placeId,
          name: name,
        },
      },
      "review/create-review"
    );
    // }
  };

  return (
    <>
      <section className={styles.reviewSection}>
        <main className={styles.reviewContainer}>
          <div className={styles.reviewTitle}>
            <div className={styles.titleBox}>
              <h2 className={styles.h2}>리뷰</h2>
            </div>
            <button className={styles.reviewBtn} onClick={handleClickReviewBtn}>
              리뷰 작성
            </button>
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
                key={review.nickname}
                nickname={review.nickname}
                memberImage={review.memberImage}
                rating={review.rating}
                content={review.content}
                createdDate={review.createdDate}
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
