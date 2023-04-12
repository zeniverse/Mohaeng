import Link from "next/link";
import styles from "./MyReviewItem.module.css";
import FiveStarRating from "../FiveStarRating/FiveStarRating";

export interface MyReviewItemProps {
  reviewId: number;
  placeId: number;
  title: string;
  content: string;
  likeCount: number;
  rating: string;
  imgUrl: string;
  createdDate: string;
}
const MyReviewItem = (myReview: MyReviewItemProps) => {
  const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  };

  return (
    <div key={myReview.reviewId} className={styles["myReview-item"]}>
      <Link
        href={{
          pathname: "/place/[id]",
          query: {
            contentId: myReview.reviewId,
            placeId: myReview.reviewId,
            name: myReview.title,
          },
        }}
        as={`/place/${myReview.reviewId}`}
      >
        <img
          src={myReview.imgUrl}
          alt={myReview.title}
          className={styles.img}
        />
      </Link>
      <div>
        <h2>{myReview.title}</h2>

        <p>{getFormattedDate(new Date(myReview.createdDate))}</p>
        <p>{myReview.content}</p>
        <p>
          <FiveStarRating rating={myReview.rating} />
        </p>
      </div>
    </div>
  );
};
export default MyReviewItem;
