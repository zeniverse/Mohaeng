import styles from "./CreateReview.module.css";
import styled from "styled-components";

import { AiFillStar } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// 별점 상태 저장, 내보내기 ㅇ
// 이미지 상대경로말고 그대로 폼데이터 생성해서 보내기. 최대 개수 지정
// 데이터 생성 백으로 보내기

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
  const [showImages, setShowImages] = useState<string[]>([]);
  const [star, setStar] = useState();
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState(null);
  let rating = clicked.filter(Boolean).length;

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

  const formData = new FormData();
  formData.append("rating", rating.toString());
  formData.append("content", content);
  formData.append("imgUrl", showImages);
  for (const keyValue of formData) console.log(keyValue);
  // useEffect(() => {
  //   sendReview();
  // }, [clicked]);

  // const submitReview = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios
  //       .post(`/api/review/${id}`, {
  //         method: "POST",
  //         headers: {
  //           "Access-Token": accessToken,
  //           "Content-Type": `multipart/form-data; `,
  //         },
  //         body: formData,
  //       })
  //       .then((response) => {
  //         alert("작성이 완료되었습니다!");
  //         console.log(response.data);
  //         router.replace(`place/${id}`);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const sendReview = () => {
  //   //별점 true값만 뽑아서 length를 이용해 개수를 확인 후 내보내기
  //   let rating = clicked.filter(Boolean).length;
  //   setStar(rating);
  // };

  // // FormData 객체 생성 (별점, )
  // const formData = new FormData();
  // formData.append("rating", star.toString());
  // formData.append("content", content);

  // // 이미지 파일을 추가
  // for (let i = 0; i < showImages.length; i++) {
  //   const blob = await fetch(showImages[i]).then((r) => r.blob());
  //   formData.append("images", blob, "image-" + i + ".jpg");
  // }

  // 이미지 상대경로 저장
  const handleAddImages = (e: any) => {
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
    if (imageUrls.length > 2) {
      imageUrls = imageUrls.slice(0, 2);
    } // 개수 2개 제한
    setShowImages(imageUrls);
    // 원본에 상태에 덮어씌우기
    console.log(imageUrls);
  };

  // 버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id));
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
          <h3 className={styles.reviewTitle}>{name}</h3>

          <div className={styles.ratingBox}>
            <strong className={styles.ratingTitle}>별점</strong>
            <Stars>
              {starArray.map((el, idx) => {
                return (
                  <AiFillStar
                    key={idx}
                    id={`${el}`}
                    size="50"
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
            <p className={styles.ratingDesc}>별점을 클릭해 주세요</p>
          </div>

          <form id="review" className={styles.form} method="POST">
            <label htmlFor="review" className={styles.boldTitle}>
              리뷰내용
            </label>
            <textarea
              className={styles.formTxtArea}
              name="reviewText"
              id="review"
              placeholder="방문한 곳은 어떠셨나요? 당신의 경험을 공유해보세요! (20자 이상)"
              minLength={20}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <label className={styles.boldTitle} htmlFor="inputFile">
              사진 추가하기
            </label>
            <input
              type="file"
              id="inputFile"
              multiple
              className={styles.imageForm}
              onChange={handleAddImages}
            />
            <span className={styles.inputFileDesc}>
              * 이미지는 최대 2장까지 첨부할 수 있습니다.
            </span>

            <div className={styles.imgContainer}>
              {showImages.map((image, id) => (
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
              ))}
            </div>
            <div className={styles.btnGroup}>
              <button className={styles.postBtn}>등록</button>
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
  width: 12rem;
  padding-top: 5px;

  & svg {
    color: var(--color-border-semi);
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;

// *별점 백엔드로 전송할 코드 (작성 버튼 클릭 시 데이터를 전송한다 )
// //event를 인자로 받아옴
// const goToFetch = e => {
//   //콘솔로 e.target.id가 잘 들어오는지 확인
//       console.log('eti', e.target.id);
//   //setClicked를 e.target.id로 변경 1,2,3,4...
//       setClicked(e.target.id);
//   //fetch 함수를 통해 백엔드로 보내줌
//       fetch(`/api/review/${id}`, {
//       method: 'POST',
//         //토큰
//       headers: {
//       "Access-Token": 액세스 토큰 ,
//         },
//       body: JSON.stringify({
//   백엔드와 변수명 같은걸로
//       rating: e.target.id,
//      content:
//      imageUrl:
//       console.log('clicked->', { clicked });
//         }),
//       });
//     };
