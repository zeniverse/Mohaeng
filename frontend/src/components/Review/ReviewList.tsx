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
import { openModal } from "@/src/store/reducers/modalSlice";

type ReviewListProps = {
  placeId: number;
  placeName: string;
};

export default function ReviewList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { placeId, name, reviewId } = router.query;
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [selectedValue, setSelectedValue] = useState("highrating");

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

  // * 새로고침 방지
  // usePreventRefresh();

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
          url = `/api/review/${placeId}/rating`;
        } else if (selectedValue === "latest") {
          url = `/api/review/${placeId}/date`;
        }

        const res = await axios.get(url, {
          params: {
            page: page,
          },
          withCredentials: true,
        });
        if (res.data.data && res.data.data.reviews) {
          dispatch(setReview(res.data.data));
          setReviewData(res.data.data.reviews);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchSelect();
  }, [selectedValue, page, placeId]);

  // * 리뷰 전체 조회
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.get(`/api/review/${placeId}/rating`, {
          params: {
            page: page,
          },
          withCredentials: true,
        });
        dispatch(setReview(res.data.data));
        setReviewData(res.data.data.reviews);
      } catch (err) {
        console.error(err);
      }
    };
    if (placeId) {
      fetchReview();
    }
  }, [page, placeId]);

  const handleClickReviewBtn = () => {
    if (!accessToken && !currentUser) {
      dispatch(
        openModal({
          modalType: "LoginModal",
          isOpen: true,
        })
      );
    } else {
      router.push(
        {
          pathname: `/review/[id]/create-review`,
          query: {
            placeId: placeId,
            reviewId: reviewId,
            name: name,
          },
        },
        `/review/${placeId}/create-review`
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
      {totalPages !== 0 && totalPages ? (
        <Pagebar totalPage={totalPages} />
      ) : null}
    </>
  );
}
