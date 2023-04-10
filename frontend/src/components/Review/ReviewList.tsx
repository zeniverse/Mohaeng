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

// 정렬 필터 (별점 높은 순, 최신순)

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
  const [selectedValue, setSelectedValue] = useState("latest");

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

  // * 정렬별 데이터 조회
  useEffect(() => {
    async function fetchSelect() {
      try {
        let url = "";
        if (selectedValue === "highrating") {
          url = `${process.env.NEXT_PUBLIC_API_URL}/api/review/${placeId}/rating`;
        } else if (selectedValue === "latest") {
          url = `${process.env.NEXT_PUBLIC_API_URL}/api/review/${placeId}/date`;
        }

        const res = await axios.get(url, {
          params: {
            page: page,
          },
          withCredentials: true,
        });
        if (res.data && res.data.data && res.data.data.reviews) {
          dispatch(setReview(res.data.data));
          setReviewData(res.data.data.reviews);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchSelect();
  }, [selectedValue, placeId, page]);

  // * 리뷰 전체 조회
  useEffect(() => {
    if (page !== 0) {
      const fetchReview = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/review/${placeId}`,
            {
              params: {
                page: page,
              },
              withCredentials: true,
            }
          );
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
                key={review.reviewId}
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
