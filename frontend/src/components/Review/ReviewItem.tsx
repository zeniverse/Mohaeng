import styles from "./ReviewItem.module.css";
import { FaRegThumbsUp } from "react-icons/fa";
import Image from "next/image";
import user from "../../../public/assets/user.png";
import FiveStarRating from "../FiveStarRating/FiveStarRating";

// 별점, 아이디, 작성일, 리뷰내용, 이미지
// 유저일 경우 수정 삭제 버튼
// 좋아요 버튼 클릭 시 +1 -1 값 저장 (리듀서 생성)

type ReviewProps = {
  memberName: string;
  rating: number;
  content: string;
  imgUrl: [];
};

export default function ReviewItem({
  memberName,
  rating,
  content,
  imgUrl,
}: ReviewProps) {
  return (
    <article className={styles.reviewBox}>
      <div className={styles.reviewer}>
        {/* <Image
          className={styles.userImg}
          src={}
          width={50}
          height={50}
          alt={}
        /> */}
        <div className={styles.reviewerInfo}>
          <div className={styles.rating}>
            <FiveStarRating rating={rating.toString()} />
          </div>
          <p className={styles.review}>{memberName}</p>
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn}>수정</button>
          <button className={styles.btn}>삭제</button>
        </div>
      </div>
      <div className={styles.reviewContent}>
        <p className={styles.reviewTxt}>{content}</p>
        <div> 이미지 박스 </div>
        {/* 이미지 조건문으로 map 순회 */}
      </div>
    </article>
  );
}

{
  /* <button className={styles.likeBtn}>
          <FaRegThumbsUp />
          {likeCount}
        </button> */
}
