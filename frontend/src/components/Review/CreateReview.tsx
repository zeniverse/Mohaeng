import styles from "./CreateReview.module.css";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "react-cookies";
import ReviewRating from "./ReviewRating";

// 별점 상태 저장, 내보내기 ㅇ
// 이미지 상대경로말고 원본 그대로 폼데이터 생성해서 보내기. 최대 개수 지정
// 데이터 생성 백으로 보내기

interface Review {
  rating: string;
  content: string;
}

export default function CreateReview() {
  const router = useRouter();
  const { id, name } = router.query;
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const starArray: Array<number> = [0, 1, 2, 3, 4];
  const [star, setStar] = useState(1);

  const [content, setContent] = useState<string>("");

  const [showImages, setShowImages] = useState<string[]>([]); // 이미지 미리보기
  const [imgBase64, setImgBase64] = useState<string[]>([]); // 파일 base64
  const [imgFile, setImgFile] = useState([]); // 전송할 이미지파일
  let rating = clicked.filter(Boolean).length;

  const handleChangeImage = (e) => {
    if (e.target.files === null) return;
    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
    }
  };
  // *비동기적으로 받아오는 별점 개수 업데이트 확인
  useEffect(() => {
    console.log(rating);
    setStar(rating);
  }, [clicked, imgFile]);

  // *별점 클릭
  const handleStarClick = (index: number): void => {
    let clickStates: boolean[] = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  // 이미지 상대경로 저장
  const handleAddImages = (e: any) => {
    setImgFile(e.target.files);
    const imageList = e.target.files;
    // 받은 파일 리스트 배열
    let imageUrls: string[] = [...showImages];
    // 현재 이미지에 복사

    for (let i = 0; i < imageList.length; i++) {
      // 받은 파일 리스트 배열 돌리기
      const currentImageUrl: string = URL.createObjectURL(imageList[i]);
      // 미리보기 가능하게 변수화()
      imageUrls.push(currentImageUrl);
      // 복사한 이미지에 추가
    }
    if (imageUrls.length > 3) {
      imageUrls = imageUrls.slice(0, 3);
    } // 개수 3개 제한
    setShowImages(imageUrls);
    // 원본에 상태에 덮어씌우기
  };

  // 버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  // *리뷰 백엔드로 전송
  const submitReview = async () => {
    if (star == 0) {
      alert("별점을 입력해주세요");
      return false;
    } else if (content == "") {
      alert("리뷰 내용을 입력해주세요");
      return false;
    }
    // JSON.stringify() 안 붙이고 그냥 보내보기
    const formData = new FormData();
    const review: Review = { rating: rating.toString(), content: content };
    // formData.append("rating", JSON.stringify(rating.toString()));
    // formData.append("content", JSON.stringify(content));
    formData.append("review", JSON.stringify(review));
    // 객체 리뷰 안에 넣어서 보내기

    // 이미지만 제대로 받아오면 된다!
    for (let i = 0; i < imgFile.length; i++) {
      formData.append("imgUrl", imgFile[i]);
      // 반복문을 활용하여 파일들을 formData 객체에 추가한다
    }
    // for (const keyValue of formData) console.log(keyValue);
    const accessToken = await cookie.load("accessToken");

    try {
      const response = await axios
        .post(`/api/review/${id}`, formData, {
          headers: {
            "Access-Token": accessToken,
            "Content-Type": "multipart/form-data;",
          },
        })
        .then((response) => {
          alert("작성이 완료되었습니다!");
          console.log(response.data);
          router.push(
            {
              pathname: `/place/[id]`,
              query: {
                id: id,
              },
            },
            `place/${id}`
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  // 뒤로 가기
  const handleGoBack = () => {
    router.back();
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
            <Stars>
              {starArray.map((el, idx) => {
                return (
                  <AiFillStar
                    fontSize={40}
                    key={idx}
                    id={`${el}`}
                    onClick={() => handleStarClick(el)}
                    className={`${clicked[el] && "yellowStar"}`}
                  />
                );
              })}
              <p className={styles.ratingTxt}>
                {rating === 5
                  ? "5.0"
                  : rating === 4
                  ? "4.0"
                  : rating === 3
                  ? "3.0"
                  : rating === 2
                  ? "2.0"
                  : rating === 1
                  ? "1.0"
                  : "0.0"}
              </p>
            </Stars>
            {/* <ReviewRating ratingIndex={star} setRatingIndex={setStar} /> */}
            <p className={styles.ratingDesc}>별점을 클릭해 주세요</p>
          </div>

          <form id="review" className={styles.form}>
            <label htmlFor="review" className={styles.boldTitle}>
              리뷰내용
            </label>
            <textarea
              className={styles.formTxtArea}
              name="review"
              id="review"
              placeholder="방문한 곳은 어떠셨나요? 당신의 경험을 공유해보세요! (20자 이상)"
              minLength={20}
              required={true}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <span>/300</span>

            <label className={styles.boldTitle} htmlFor="inputFile">
              사진 추가하기
            </label>
            <input
              type="file"
              id="inputFile"
              multiple
              className={styles.imageForm}
              onChange={handleChangeImage}
            />
            <span className={styles.inputFileDesc}>
              * 이미지는 최대 3장까지 첨부할 수 있습니다.
            </span>
            <div className={styles.imgContainer}>
              {/* {showImages.map((image, id) => (
                <div className={styles.imgBox} key={id}>
                  <Image
                    src={image}
                    width={200}
                    height={200}
                    alt={`${image}-${id}`}
                  />
                  <IoMdClose
                    className={styles.deleteImg}
                    onClick={() => handleDeleteImage(id)}
                  />
                </div>
              ))} */}
            </div>
            <div className={styles.btnGroup}>
              <button className={styles.postBtn} onClick={submitReview}>
                등록
              </button>
              <button className={styles.cancelBtn} onClick={handleGoBack}>
                취소
              </button>
            </div>
          </form>
        </article>
      </section>
    </>
  );
}

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: var(--color-border-semi);
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: var(--color-border-semi);
  }

  .yellowStar {
    color: #fcc419;
  }
`;

// setImage(()=>event.target.files[0]);

// //set preview image
// objectUrl = URL.createObjectURL(event.target.files[0])
// setImgPreview(objectUrl);

// 파일리더로 미리보기
// const handleChangeFile = (e: any) => {
//   console.log(e.target.files);
//   setImgFile(e.target.files);
//   setImgBase64([]);
//   for (var i = 0; i < e.target.files.length; i++) {
//     if (e.target.files[i]) {
//       let reader = new FileReader();
//       reader.readAsDataURL(e.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
//       // 파일 상태 업데이트
//       reader.onloadend = () => {
//         // 2. 읽기가 완료되면 아래코드가 실행됩니다.
//         const base64 = reader.result;
//         console.log(base64);
//         if (base64) {
//           var base64Sub = base64.toString();
//           setImgBase64((imgBase64: string[]) => [...imgBase64, base64Sub]);
//         }
//         if (imgBase64.length > 3) {
//           imgBase64 = imgBase64.slice(0, 3);
//         } // 개수 3개 제한
//       };
//     }
//   }
// };
