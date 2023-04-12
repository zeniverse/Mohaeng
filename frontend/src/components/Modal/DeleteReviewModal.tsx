import { closeModal } from "@/src/store/reducers/modalSlice";
import { RootState } from "@/src/store/store";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DeleteReviewModal.module.css";
import cookie from "react-cookies";
import { ReviewData } from "@/src/store/reducers/reviewSlice";

// 삭제 로직 구현 (리뷰아이디 필요, 경로 설정)

// interface DeleteReviewModalProps {
//   reviewId: string;
//   name: string;
//   handleClose: () => void;
// }

export default function DeleteReviewModal(props: { reviewId: string }) {
  const router = useRouter();
  const { name } = router.query;
  const { reviewId } = props;
  console.log(reviewId);
  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const deleteReview = async () => {
    try {
      const accessToken = await cookie.load("accessToken");
      const response = await axios.delete(`/api/review/detail/${reviewId}`, {
        headers: {
          "Access-Token": accessToken,
        },
      });
      console.log(response.status);
      console.log(response.data);
      router.push(`/search?keyword=${name}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className={styles.deleteReviewModalContainer}>
        <div className={styles.deleteReviewInfo}>
          <p className={styles.deletReviewTxt}>리뷰를 삭제하시겠습니까?</p>
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.deleteBtn} onClick={deleteReview}>
            삭제
          </button>
          <button className={styles.cancelBtn} onClick={handleModalClose}>
            취소
          </button>
        </div>
      </section>
    </>
  );
}
