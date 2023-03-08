import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import styles from "./RegisterReview.module.css";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function RegisterReview() {
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  // 별점 기본값 설정

  const handleStarClick = (index: number): void => {
    let clickStates: boolean[] = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    sendReview();
  }, [clicked]);

  const sendReview = (): void => {
    let score: number = clicked.filter(Boolean).length;
    // fetch('http://...', {
    //   method: 'POST',
    //   Headers: {
    //     Authroization: 'e7f59ef4b4900fe5aa839fcbe7c5ceb7',
    //   },
    //   body: JSON.stringify({
    //     movie_id:1
    //     star: score,
    //   }),
    // });
  };

  const [showImages, setShowImages] = useState<string[]>([]);
  // 이미지 상대경로 저장
  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageList: FileList = e.target.files;
    // 받은 파일 리스트 배열
    let imageUrls: string[] = [...showImages];
    // 현재 이미지에 복사

    for (let i = 0; i < imageList.length; i++) {
      // 받은 파일 리스트 배열 돌리기
      const currentImageUrl: string = URL.createObjectURL(imageList[i]);
      // 미리보기 가능하게 변수화
      imageUrls.push(currentImageUrl);
      // 복사한 이미지에 추가
    }
    if (imageUrls.length > 4) {
      imageUrls = imageUrls.slice(0, 4);
    } // 개수 4개 제한
    setShowImages(imageUrls);
    // 원본에 상태에 덮어씌우기
  };

  // 버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <>
      <section className={styles.registerReviewContainer}>
        <h2 className={styles.h2}>리뷰 작성</h2>
        <article className={styles.registerReview}>
          <h3 className={styles.reviewTitle}>선택한 여행지 이름 </h3>

          <div className={styles.ratingBox}>
            <strong>별점</strong>
            <Stars>
              {[0, 1, 2, 3, 4].map((el, idx) => {
                return (
                  <AiFillStar
                    key={idx}
                    size="50"
                    onClick={() => handleStarClick(el)}
                    className={clicked[el] && "yellowStar"}
                  />
                );
              })}
            </Stars>
          </div>

          <strong>리뷰내용</strong>
          <form className={styles.form} action="POST">
            <textarea
              className={styles.formTxtArea}
              name="reviewText"
              id="review"
              placeholder="방문한 곳은 어떠셨나요? 당신의 경험을 공유해보세요!"
              required
            ></textarea>

            <strong>사진 첨부</strong>

            {/* label사용해서 css 입히기(onChange 여기에, input은 display:none) */}
            <input
              type="file"
              id="inputFile"
              multiple
              className={styles.imageForm}
              onChange={handleAddImages}
            />
            <span className={styles.inputFileDesc}>
              * 이미지는 최대 4장까지 첨부할 수 있습니다.
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
                  <IoMdRemoveCircleOutline
                    className={styles.removeImg}
                    onClick={() => handleDeleteImage(id)}
                  />
                </div>
              ))}
            </div>
            {/* {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="local file"
              />
            )} */}
            <div className={styles.btnGroup}>
              <button className={styles.postBtn}>등록</button>
              <Link href="/placeDetail" className={styles.cancelBtn}>
                취소
              </Link>
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
    color: gray;
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
//       fetch(`http://10.58.3.24:8000/products/1`, {
//       method: 'POST',
//         //토큰
//       headers: {
//       Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.loTjeBWZ9SeXV-BcIxqOtX37AN30ROvsZl0_udeeRJU',
//         },
//       body: JSON.stringify({
//   //rating-> 백엔드와 변수명 같은걸로
//       rating: e.target.id,
//       console.log('clicked->', { clicked });
//         }),
//       });
//     };

// * 이미지 미리보기 - FileReader 메서드 사용
// const handleImageUpload = (e) => {
//   const fileArr = e.target.files;

//   let fileURLs = [];

//   let file;
//   let filesLength = fileArr.length > 4 ? 4 : fileArr.length;

//   for (let i = 0; i < filesLength; i++) {
//     file = fileArr[i];

//     let reader = new FileReader();
//     reader.onload = () => {
//       console.log(reader.result);
//       fileURLs[i] = reader.result;
//       setDetailImgs([...fileURLs]);
//     };
//     reader.readAsDataURL(file);
//   }
// };
