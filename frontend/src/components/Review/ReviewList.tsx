import styles from "./ReviewList.module.css";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import ReviewItem from "./ReviewItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { ReviewData, setReview } from "@/src/store/reducers/reviewSlice";
import Pagebar from "../Pagenation/Pagebar";
import { setPage } from "@/src/store/reducers/pageSlice";
import { access } from "fs";

// 정렬 필터 (별점 순)
// 리뷰 전체 조회

interface Review {
  reviewId: number;
  nickname: string;
  memberImage: string;
  rating: string;
  content: string;
  createdDate: string;
  imgUrl: string[];
}

export default function ReviewList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { placeId, name, reviewId } = router.query;

  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [selectedValue, setSelectedValue] = useState("default");

  const page = useSelector((state: RootState) => state.page.page);
  const totalPages: number = useSelector(
    (state: RootState) => state.review.totalPages
  );
  const totalElements = useSelector(
    (state: RootState) => state.review.totalElements
  );
  const averageRating = useSelector(
    (state: RootState) => state.review.averageRating
  );

  const currentUser = useSelector(
    (state: RootState) => state.nickName.nickName
  );
  const accessToken = useSelector((state: RootState) => state.token.token);

  // 정렬
  const handleChangeOption = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedValue(e.target.value);
  };

  // 리뷰 조회
  useEffect(() => {
    if (page !== 0) {
      const fetchReview = async () => {
        try {
          const res = await axios.get(`/api/review/${placeId}`, {
            params: {
              page: page,
            },
            withCredentials: true,
          });
          console.log(res.data.data);
          dispatch(setReview(res.data.data));
          setReviewData(res.data.data.reviews);
        } catch (err) {
          console.error(err);
        }
      };
      fetchReview();
    }
  }, [page]);

  // ToDo: 리뷰 한 번만 쓰도록? (여행지별 리뷰는 한 번만 작성할 수 있습니다. || 이미 작성하신 리뷰가 있습니다.)
  const handleClickReviewBtn = () => {
    if (!accessToken && !currentUser) {
      router.push("/login");
    } else {
      router.push(
        {
          pathname: `/review/create-review`,
          query: {
            placeId: placeId,
            reviewId: reviewId,
            name: name,
          },
        },
        `review/create-review`
      );
    }
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
              <p> 총 {totalElements}건의 리뷰</p>
              <span>
                <FiveStarRating rating={averageRating.toString()} />
              </span>
            </div>
            <select
              className={styles.select}
              value={selectedValue}
              onChange={handleChangeOption}
            >
              <option key="default" value="default">
                정렬 ▼
              </option>
              <option key="highrating" value="highrating">
                별점 높은 순
              </option>
              <option key="latest" value="latest">
                최신순
              </option>
            </select>
          </aside>
          <div className={styles.reviewList}>
            {reviewData?.map((review) => (
              <ReviewItem
                key={review.nickname}
                reviewId={review.reviewId}
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
      {totalElements ? <Pagebar totalPage={totalPages} /> : ""}
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
