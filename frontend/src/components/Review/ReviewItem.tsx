import styles from "./ReviewItem.module.css";
import { FaRegThumbsUp } from "react-icons/fa";
import Image from "next/image";
import user from "../../../public/assets/user.png";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useRouter } from "next/router";

// 별점, 아이디, 작성일, 리뷰내용, 이미지
// 유저일 경우 수정 삭제 버튼

type ReviewProps = {
  memberName: string;
  rating: string;
  content: string;
  imgUrl: [];
};

export default function ReviewItem({
  memberName,
  rating,
  content,
  imgUrl,
}: ReviewProps) {
  const router = useRouter();
  const [user, setUser] = useState();
  const currentUser = useSelector(
    (state: RootState) => state.nickName.nickName
  );
  // setUser(currentUser);

  return (
    <article className={styles.reviewBox}>
      <div className={styles.reviewer}>
        {/* <Image
          className={styles.userImg} // 프로필 url, state
          src={}
          width={50}
          height={50}
          alt={}
        /> */}
        <div className={styles.reviewerInfo}>
          <div className={styles.rating}>
            <FiveStarRating rating={rating} />
          </div>
          <p className={styles.review}>{memberName}</p>
        </div>
        {currentUser === memberName ? (
          <div className={styles.btnGroup}>
            <button className={styles.btn}>수정</button>
            <button className={styles.btn}>삭제</button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.reviewContent}>
        <p className={styles.reviewTxt}>{content}</p>
        <div> 이미지 박스 </div>
        {/* 이미지 조건문으로 map 순회 최대 3개 */}
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
