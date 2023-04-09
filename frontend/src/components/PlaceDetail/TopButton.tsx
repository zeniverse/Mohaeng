// import { useEffect, useState } from "react";
// import { AiOutlineArrowUp } from "react-icons/ai";

// export default function TopButton() {
//   const [showButton, setShowButton] = useState(false);

//   const scrollToTop = () => {
//     window.scroll({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   useEffect(() => {
//     const showBtnClick = () => {
//       if (window.scrollY > 200) {
//         setShowButton(true);
//       } else {
//         setShowButton(false);
//       }
//       window.addEventListener("scroll", showBtnClick);
//     };
//   }, []);
//   return (
//     <>
//       {showButton ? (
//         <div>
//           <button onClick={scrollToTop}>
//             <AiOutlineArrowUp />
//           </button>
//         </div>
//       ) : (
//         ""
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import styles from "./TopButton.module.css";

function TopButton() {
  // 토글 여부를 결정하는 state 선언
  const [toggleBtn, setToggleBtn] = useState(true);

  // window 객체에서 scrollY 값을 받아옴
  // 어느정도 스크롤이 된건지 판단 후, 토글 여부 결정
  const handleScroll = () => {
    const { scrollY } = window;

    scrollY > 200 ? setToggleBtn(true) : setToggleBtn(false);
  };

  // scroll 이벤트 발생 시 이를 감지하고 handleScroll 함수를 실행
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 버튼 클릭 시 스크롤을 맨 위로 올려주는 함수
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 토글 여부 state에 따라 버튼을 보여주거나 감추게 만듦
  return toggleBtn ? (
    <div onClick={goToTop} className={styles.topBtn}>
      <AiOutlineArrowUp className={styles.topArrow} />
    </div>
  ) : null;
}

export default TopButton;
