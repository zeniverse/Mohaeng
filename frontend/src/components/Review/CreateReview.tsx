import styles from "./CreateReview.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import cookie from "react-cookies";
import ReviewRating from "./ReviewRating";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { getMyReview } from "@/src/store/reducers/myReviewSlice";
import ReviewTextArea from "./ReviewTextarea";
import usePreventRefresh from "@/src/hooks/usePreventRefresh";

export default function CreateReview() {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { placeId, contentId, name } = router.query;
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [content, setContent] = useState<string>("");
  const [star, setStar] = useState<number>();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  let rating = clicked.filter(Boolean).length;

  // * 새로고침 방지
  usePreventRefresh();

  // *비동기적으로 받아오는 별점 개수 업데이트 확인
  useEffect(() => {
    console.log(rating);
    setStar(star);
  }, [clicked]);

  // *별점 클릭
  const handleStarClick = (index: number): void => {
    let clickStates: boolean[] = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  // * 이미지 미리보기 (3장 제한)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = [...images];
    const newPreviews = [...previews];

    for (let i = 0; i < e.target.files!.length; i++) {
      const file = e.target.files![i];

      if (newImages.length < 3) {
        newImages.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target!.result as string);
          setPreviews(newPreviews);
        };
        reader.readAsDataURL(file);
      }
    }
    setImages(newImages);
  };

  const handleDeletePreview = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  // *리뷰 백엔드로 전송
  const submitReview = async () => {
    if (rating === 0) {
      alert("별점을 입력해주세요");
      return false;
    } else if (content === "") {
      alert("리뷰 내용을 입력해주세요");
      return false;
    }
    const formData = new FormData();
    images.forEach((image) => {
      if (image instanceof File && image.size > 0) {
        formData.append("multipartFile", image);
      }
    });

    let review = {
      rating: rating,
      content: content,
    };
    formData.append(
      "review",
      new Blob([JSON.stringify(review)], { type: "application/json" })
    );

    try {
      const accessToken = await cookie.load("accessToken");
      const response = await axios
        .post(`/api/review/${placeId}`, formData, {
          headers: {
            "Access-Token": accessToken,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data, "리뷰 작성 성공!");
          appDispatch(getMyReview(accessToken));
          router.push(
            {
              pathname: `/place/[id]`,
              query: {
                contentId: contentId,
                placeId: placeId,
                name: name,
              },
            },
            `/place/${contentId}`
          );
        });
    } catch (error) {
      router.push(`/search?keyword=${name}`);
      console.log(error, "리뷰 작성 실패ㅠ");
    }
  };

  // 뒤로 가기
  const handleGoBack = () => {
    const confirmed = window.confirm(
      "작성 중인 내용이 있습니다. 페이지를 떠나시겠습니까?"
    );
    if (confirmed) {
      router.back();
    }
  };

  return (
    <>
      <section className={styles.registerReviewContainer}>
        <h2 className={styles.h2}>리뷰 작성</h2>
        <article className={styles.registerReview}>
          <p className={styles.boldTitle}>선택한 여행지</p>
          <h3 className={styles.reviewTitle}>{name}</h3>

          <div className={styles.ratingBox}>
            <strong className={styles.ratingTitle}>별점</strong>
            <ReviewRating clicked={clicked} onStarClick={handleStarClick} />
            <p className={styles.ratingDesc}>별점을 클릭해 주세요</p>
          </div>

          <div id="review" className={styles.form}>
            <ReviewTextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <p className={styles.boldTitle}>사진 추가하기</p>
            <label htmlFor="inputFile">
              <div className={styles.chooseFile}>사진 선택</div>
            </label>
            <input
              type="file"
              id="inputFile"
              multiple
              className={styles.imageForm}
              onChange={handleImageChange}
            />
            <span className={styles.inputFileDesc}>
              * 사진은 최대 3장까지 첨부할 수 있습니다.
            </span>

            <div className={styles.imgContainer}>
              {previews?.map((preview, index) => (
                <div className={styles.imgBox} key={index}>
                  <Image
                    src={preview}
                    width={200}
                    height={200}
                    alt={`${preview}-${index}`}
                  />
                  <IoMdClose
                    className={styles.deleteImg}
                    onClick={() => handleDeletePreview(index)}
                  />
                </div>
              ))}
            </div>
            <div className={styles.btnGroup}>
              <button className={styles.postBtn} onClick={submitReview}>
                등록
              </button>
              <button className={styles.cancelBtn} onClick={handleGoBack}>
                취소
              </button>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
