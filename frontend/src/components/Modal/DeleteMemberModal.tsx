import React from "react";
import styled from "styled-components";

export default function BasicModal() {
  return (
    <>
      <Content>
        정말 탈퇴하시겠어요? 탈퇴시 회원님이 작성하신 여행 일정과 북마크해둔
        장소들이 영구 삭제됩니다!
      </Content>
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
