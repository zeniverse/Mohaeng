import { closeModal } from "@/src/store/reducers/modalSlice";
import { useDispatch } from "react-redux";
import styles from "./DeleteReviewModal.module.css";
import styled from "styled-components";

export default function DeleteReviewModal() {
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Content className={styles.deleteReviewModalContainer}>
        <p>리뷰를 삭제하시겠습니까?</p>
        <button onClick={handleModalClose}>취소</button>
        <button>삭제</button>
      </Content>
    </>
  );
}

const Content = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 30rem;
  height: 33rem;
  background: #fff;
  border-radius: 12px;
  padding: 4rem;
  z-index: 1;
`;
