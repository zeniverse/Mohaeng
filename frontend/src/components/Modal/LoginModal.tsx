"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import styles from "./LoginModal.module.css";
import { GrFormClose } from "react-icons/gr";
import { closeModal } from "../../store/reducers/modalSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import btnKakao from "/public/assets/btnKakao.png";
import { KAKAO_AUTH_URL } from "../../pages/api/auth/OAuth";

export default function LoginModal() {
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch(closeModal());
  };

  return (
    <Content className={styles.loginContent}>
      <h2 className={styles.loginTitle}>로그인 / 회원가입</h2>
      <p className={styles.loginInfo}>
        간편하게 로그인하고 모두의 여행을 경험해보세요
      </p>
      <div className={styles.btnList}>
        <Link className={styles.link} href={KAKAO_AUTH_URL}>
          <KakaoBtn className={styles.btn}>
            <Image src={btnKakao} alt="카카오 로그인" width={352} height={54} />
          </KakaoBtn>
        </Link>
      </div>
      <p className={styles.footer}>
        로그인 또는 회원가입 시, 모두의 여행 이용약관 및 개인정보 정책에 동의한
        것으로 간주합니다.
      </p>
      <CloseBtn onClick={handleModalClose}>
        <GrFormClose className={styles.closeBtn} />
      </CloseBtn>
    </Content>
  );
}

const KakaoBtn = styled.button`
  border: 0;
  outline: 0;
  background-color: transparent;
  cursor: pointer;
`;

// const GoogleBtn = styled.button`
//   width: 352px;
//   color: white;
//   display: flex;
//   align-items: center;
//   border: 0;
//   border-radius: 6px;
//   background-color: #4285f4;
//   border: none;
//   font-weight: 500;
//   font-size: 16px;
//   padding: 1px;
//   cursor: pointer;
// `;

const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 14px;
  font-size: 32px;
  padding: 0 4px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

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
