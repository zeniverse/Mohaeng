import Link from "next/link";
import styles from "./MyReviewItem.module.css";

export interface MyReviewItemProps {
  reviewId: number;
  placeId: number;
  name: string;
  content: string;
  raiting: string;
  imgUrl: string;
  createdDate: string;
}
const MyReviewItem = (myReview: MyReviewItemProps) => {
  return (
    <div key={myReview.reviewId} className={styles["myReview-item"]}>
      <Link
        href={{
          pathname: "/place/[id]",
          query: {
            contentId: myReview.reviewId,
            placeId: myReview.reviewId,
            name: myReview.name,
          },
        }}
        as={`/place/${myReview.reviewId}`}
      >
        <img src={myReview.imgUrl} alt={myReview.name} className={styles.img} />
      </Link>
      <div>
        <h2>{myReview.name}</h2>
        <p>{myReview.raiting}</p>
        <p>{myReview.createdDate}</p>
        <p>{myReview.content}</p>
      </div>
    </div>
  );
};
export default MyReviewItem;
