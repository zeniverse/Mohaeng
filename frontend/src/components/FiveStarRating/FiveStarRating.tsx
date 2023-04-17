import styles from "./FiveStarRating.module.css";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

interface FiveStarRatingProps {
  rating: string;
}

const FiveStarRating = ({ rating }: FiveStarRatingProps) => {
  const ratingNumber = parseFloat(rating);
  const starList = [];
  const starFillCount = Math.floor(ratingNumber);
  const hasHalfStar = ratingNumber - parseInt(rating) >= 0.5;
  const emptyStarCount = 5 - starFillCount - (hasHalfStar ? 1 : 0);

  for (let i = 1; i <= starFillCount; i++) {
    starList.push(<BsStarFill key={"star-fill" + i} />);
  }

  if (hasHalfStar) {
    starList.push(<BsStarHalf key={"star-half"} />);
  }

  for (let i = 1; i <= emptyStarCount; i++) {
    starList.push(<BsStar key={"star-empty" + i} />);
  }

  return (
    <div className={styles["rating-container"]}>
      <span className={styles.star}>{starList}</span>
      <span className={styles.number}>({rating}/5)</span>
    </div>
  );
};

export default FiveStarRating;
