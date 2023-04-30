import styles from "./MyReview.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import MyReviewItem from "./MyReviewItem";

const MyReview = () => {
  const myReview = useSelector((state: RootState) => state.myReview.data);

  return (
    <>
      <div className={styles.tabContainer}></div>
      <div className={styles["review-container"]}>
        {myReview.map((review) => (
          <MyReviewItem
            reviewId={review.reviewId}
            placeId={review.placeId}
            imgUrl={review.imgUrl}
            title={review.title}
            likeCount={review.likeCount}
            createdDate={review.createdDate}
            content={review.content}
            rating={review.rating}
            contentId={review.contendId}
          />
        ))}
      </div>
    </>
  );
};

export default MyReview;
