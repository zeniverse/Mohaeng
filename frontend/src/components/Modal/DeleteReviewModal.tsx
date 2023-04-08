import { closeModal } from "@/src/store/reducers/modalSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styles from "./DeleteReviewModal.module.css";

// 삭제 로직 구현 (리뷰아이디 필요, 경로 설정)

export default function DeleteReviewModal() {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  //   const deleteReview = async () => {
  //     try {
  //       const response = await axios.delete(`/api/review/oveiview/${reviewId}`);
  //       console.log(response.status);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <>
      <section className={styles.deleteReviewModalContainer}>
        <div className={styles.deleteReviewInfo}>
          <p className={styles.deletReviewTxt}>리뷰를 삭제하시겠습니까?</p>
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.deleteBtn}>삭제</button>
          <button className={styles.cancelBtn} onClick={handleModalClose}>
            취소
          </button>
        </div>
      </section>
    </>
  );
}
