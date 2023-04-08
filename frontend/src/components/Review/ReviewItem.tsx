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
  memberImage: string;
  content: string;
  // imgUrl: string;
  rating: number;
};

export default function ReviewItem({
  memberName,
  memberImage,
  rating,
  content,
}: // imgUrl,
ReviewProps) {
  const router = useRouter();
  const { placeId } = router.query;
  const [user, setUser] = useState();
  const currentUser = useSelector(
    (state: RootState) => state.nickName.nickName
  );
  // setUser(currentUser);
  console.log(currentUser);

  const canEdit = "김새롬" === memberName;

  return (
    <article className={styles.reviewBox}>
      <div className={styles.reviewer}>
        <Image
          className={styles.userImg} // 프로필 url, state
          src={memberImage}
          width={50}
          height={50}
          alt={memberName}
        />
        <div className={styles.reviewerInfo}>
          <div className={styles.rating}>
            <FiveStarRating rating={rating.toString()} />
          </div>
          <p className={styles.review}>{memberName}</p>
        </div>
        {canEdit ? (
          <div className={styles.btnGroup}>
            <button
              onClick={() =>
                router.push(
                  {
                    pathname: "/review/edit-review",
                    query: {
                      plcaceId: placeId,
                    },
                  },
                  "review/edit-review"
                )
              }
              className={styles.btn}
            >
              수정
            </button>
            <button className={styles.btn}>삭제</button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.reviewContent}>
        <p className={styles.reviewTxt}>{content}</p>
        {/* {imgUrl && (
          <Image src={imgUrl[0]} width={100} height={100} alt={memberName} />
        )} */}
        {/* <div> 이미지 박스 </div>
        이미지 조건문으로 map 순회 최대 3개 */}
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
