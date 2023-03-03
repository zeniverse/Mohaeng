import React from "react";
import styled from "styled-components";

export default function BasicModal() {
  return (
    <>
      <Content>기본 모달입니다.</Content>
    </>
  );
}

const Content = styled.section`
  width: 31rem;
  height: 36rem;
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  z-index: 1;
`;
