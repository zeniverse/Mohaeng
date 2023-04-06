import styles from "./CreateReview.module.css";
import styled from "styled-components";

export default function EditReview() {
  // 리뷰 단일 조회해서 받아오기
  return <div></div>;
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
