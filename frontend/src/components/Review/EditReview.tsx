import styles from "./CreateReview.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import cookie from "react-cookies";
import ReviewRating from "./ReviewRating";

export interface formData {
  reviewId: number;
  nickname: string;
  content: string;
  likeCount: number;
  rating: string;
  createdDate: string;
  imageUrls: string[];
}

export default function EditReview() {
  const router = useRouter();
  const { placeId, reviewId, name } = router.query;

  const [clicked, setClicked] = useState<boolean[]>(Array(5).fill(false));
  const [content, setContent] = useState<string>("");
  const [star, setStar] = useState<number>();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [reviewForm, setReviewForm] = useState<formData>({
    reviewId: 0,
    nickname: "",
    content: "",
    likeCount: 0,
    rating: "",
    createdDate: "",
    imageUrls: [],
  });

  const accessToken = cookie.load("accessToken");
  let rating = clicked.filter(Boolean).length;

  // * 수정한 별점 보여주기
  useEffect(() => {
    setClicked(Array(5).fill(false).fill(true, 0, parseInt(reviewForm.rating)));
  }, [reviewForm.rating]);

  // * 리뷰데이터 받아오기
  useEffect(() => {
    const fetchReviewDetail = async () => {
      try {
        const res = await axios.get(`/api/review/detail/${reviewId}`, {
          headers: {
            "Access-Token": accessToken,
          },
        });
        console.log(res.data.data);
        setReviewForm({
          ...res.data.data,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviewDetail();
  }, [reviewId]);

  // * 별점 클릭
  const handleStarClick = (index: number): void => {
    let clickStates: boolean[] = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  // * 이미지 미리보기(3장 제한)
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

  // * 이미지 미리보기 삭제
  const handleDeletePreview = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  // * 받아온 데이터 이미지 삭제
  const handleDeleteImage = (index: number) => {
    const newImageUrls = [...reviewForm.imageUrls];
    newImageUrls.splice(index, 1);
    setReviewForm({
      ...reviewForm,
      imageUrls: newImageUrls,
    });
  };

  // * 리뷰 백엔드로 전송
  const submitReview = async () => {
    if (star == 0) {
      alert("별점을 입력해주세요");
      return false;
    } else if (content == "") {
      alert("리뷰 내용을 수정해주세요");
      return false;
    }
    const formData = new FormData();
    const getImageBlob = async (url: string): Promise<[Blob, string]> => {
      const filename = url.substring(url.lastIndexOf("/") + 1);
      const res = await fetch(url);
      const blob = await res.blob();
      return [blob, filename];
    };

    // * 기존에 업로드한 이미지 파일이 있으면 받아옴
    if (reviewForm.imageUrls.length > 0) {
      const imageBlobs = await Promise.all(
        reviewForm.imageUrls.map((url) => getImageBlob(url))
      );
      imageBlobs.forEach(([blob, filename]) => {
        formData.append("multipartFile", blob, filename);
      });
    }

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
      const response = await axios
        .put(`/api/review/detail/${reviewId}`, formData, {
          headers: {
            "Access-Token": accessToken,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data, "리뷰 수정 성공!");
          router.push(`/search?keyword=${name}`);
        });
    } catch (error) {
      router.push(`/search?keyword=${name}`);
      console.log(error, "리뷰 수정 실패ㅠ");
    }
  };

  // * 뒤로 가기
  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <section className={styles.registerReviewContainer}>
        <h2 className={styles.h2}>리뷰 수정</h2>
        <article className={styles.registerReview}>
          <p className={styles.boldTitle}>선택한 여행지</p>
          <h3 className={styles.reviewTitle}>{name}</h3>

          <div className={styles.ratingBox}>
            <strong className={styles.ratingTitle}>별점</strong>
            <ReviewRating clicked={clicked} onStarClick={handleStarClick} />
            <p className={styles.ratingDesc}>별점을 클릭해 주세요</p>
          </div>

          <div id="review" className={styles.form}>
            <label htmlFor="review" className={styles.boldTitle}>
              리뷰내용
            </label>
            <textarea
              defaultValue={reviewForm.content}
              className={styles.formTxtArea}
              name="review"
              id="review"
              placeholder="방문한 곳은 어떠셨나요? 당신의 경험을 공유해보세요!"
              required={true}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

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
              {reviewForm.imageUrls?.map((preview, index) => (
                <div className={styles.imgBox} key={index}>
                  <Image
                    src={preview}
                    width={200}
                    height={200}
                    alt={`${preview}-${index}`}
                  />
                  <IoMdClose
                    className={styles.deleteImg}
                    onClick={() => handleDeleteImage(index)}
                  />
                </div>
              ))}
            </div>
            <div className={styles.btnGroup}>
              <button className={styles.postBtn} onClick={submitReview}>
                수정
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
