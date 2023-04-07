import styles from "./ReviewRating.module.css";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

type RatingProps = {
  ratingIndex: number;
  setRatingIndex: (index: number) => void;
};

export default function ReviewRating({
  ratingIndex,
  setRatingIndex,
}: RatingProps) {
  const starArray = [1, 2, 3, 4, 5];

  return (
    <div className={styles.ratingBox}>
      {starArray.map((el, index) => (
        <AiFillStar
          id={el.toString()}
          fontSize={40}
          key={index}
          className={el <= ratingIndex ? styles.active : styles.inactive}
          onClick={() => setRatingIndex(el)}
        />
      ))}
      <p className={styles.ratingTxt}>
        {ratingIndex === 5
          ? "5.0"
          : ratingIndex === 4
          ? "4.0"
          : ratingIndex === 3
          ? "3.0"
          : ratingIndex === 2
          ? "2.0"
          : ratingIndex === 1
          ? "1.0"
          : "0.0"}
      </p>
    </div>
  );
}
