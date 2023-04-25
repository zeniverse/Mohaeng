import styles from "./ReviewItem.module.css";
import cookie from "react-cookies";
import Image from "next/image";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useRouter } from "next/router";
import { openModal } from "@/src/store/reducers/modalSlice";
import axios from "axios";

// 별점, 아이디, 작성일, 리뷰내용, 이미지
// 유저일 경우 수정 삭제 버튼

type ReviewProps = {
  reviewId: number;
  nickname: string;
  memberImage: string;
  content: string;
  imgUrl: string[];
  rating: string;
  createdDate: string;
};

export default function ReviewItem({
  reviewId,
  nickname,
  memberImage,
  rating,
  content,
  createdDate,
  imgUrl,
}: ReviewProps) {
  const router = useRouter();
  const { placeId, name } = router.query;
  // const [user, setUser] = useState();
  const currentUser = useSelector(
    (state: RootState) => state.nickName.nickName
  );
  const dispatch = useDispatch();
  const isUser = nickname === currentUser;
  const [isExpanded, setIsExpanded] = useState(false);

  const deleteReview = async () => {
    const confirmed = window.confirm("리뷰를 삭제하시겠습니까?");
    if (confirmed) {
      try {
        const accessToken = await cookie.load("accessToken");
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/review/detail/${reviewId}`,
          {
            headers: {
              "Access-Token": accessToken,
            },
          }
        );
        // console.log(response.status);
        // console.log(response.data);
        router.push(`/search?keyword=${name}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article className={styles.reviewBox}>
      <div className={styles.reviewer}>
        <Image
          className={styles.userImg}
          src={memberImage}
          width={50}
          height={50}
          alt={nickname}
        />
        <div className={styles.reviewerInfo}>
          <div className={styles.rating}>
            <FiveStarRating rating={rating.toString()} />
          </div>
          <p className={styles.reviewerId}>
            {nickname} | {createdDate}
          </p>
        </div>
        {isUser ? (
          <div className={styles.btnGroup}>
            <button
              onClick={() =>
                router.push(
                  {
                    pathname: `/review/edit-review/[id]`,
                    query: {
                      placeId: placeId,
                      reviewId: reviewId,
                      name: name,
                    },
                  },
                  `/review/edit-review/${reviewId}`
                )
              }
              className={styles.btn}
            >
              수정
            </button>
            <button onClick={deleteReview} className={styles.btn}>
              삭제
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.reviewContent}>
        {content.length && imgUrl?.length > 0 ? (
          isExpanded ? (
            <div className={styles.reviewItem}>
              <p className={styles.reviewTxt}>{content}</p>
              <div className={styles.reviewImgBox}>
                {imgUrl.map((imgUrl, index) => (
                  <div className={styles.reviewImg} key={index}>
                    <Image
                      src={imgUrl}
                      width={200}
                      height={180}
                      alt={`img-${index}`}
                    />
                  </div>
                ))}
              </div>
              <button onClick={toggleExpand} className={styles.showMoreBtn}>
                접기
              </button>
            </div>
          ) : (
            <div>
              <p className={styles.reviewTxt}>{content.substring(0, 100)}...</p>
              <button onClick={toggleExpand} className={styles.showMoreBtn}>
                더 보기
              </button>
            </div>
          )
        ) : (
          <div className={styles.reviewItem}>
            <p className={styles.reviewTxt}>{content}</p>
            {imgUrl?.length > 0 && (
              <div className={styles.reviewImgBox}>
                {imgUrl.map((imgUrl, index) => (
                  <div className={styles.reviewImg} key={index}>
                    <Image
                      src={imgUrl}
                      width={200}
                      height={180}
                      alt={`img-${index}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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
