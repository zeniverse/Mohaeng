import React, { useCallback } from "react";
import Link from "next/link";
import styled from "styled-components";
import styles from "./LoginModal.module.css";
import { GrFormClose } from "react-icons/gr";
import { closeModal } from "@/store/reducers/modalSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import btnKakao from "@/public/assets/btnKakao.png";
import btnGoogle from "@/public/assets/btnGoogle.png";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from "@/Lib/OAuth";

export default function LoginModal() {
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch(closeModal());
  };

  // 로그인 로직 (나중에 분리)
  const onKakaoLogin = useCallback((e: { preventDefault: () => void }) => {
    e.preventDefault();

    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  }, []);

  return (
    <Content>
      <h1 className={styles.h1}>로그인 / 회원가입</h1>
      <p className={styles.desc}>
        간편하게 로그인하고 모두의 여행을 경험해보세요
      </p>
      <div className={styles.btnlist}>
        <Link className={styles.link} href={KAKAO_AUTH_URL}>
          <KakaoBtn className={styles.btn}>
            <Image src={btnKakao} alt="카카오 로그인" width={320} height={48} />
          </KakaoBtn>
        </Link>
        <Link className={styles.link} href={GOOGLE_AUTH_URL}>
          <GoogleBtn className={styles.btn}>
            <Image src={btnGoogle} alt="구글 로그인" width={46} height={46} />
            <p className={styles.p}>Google 로그인</p>
          </GoogleBtn>
        </Link>
      </div>
      <p className={styles.footer}>
        로그인 또는 회원가입 시, 모두의 여행 이용약관 및 개인정보 정책에 동의한
        것으로 간주합니다.
      </p>
      <CloseBtn onClick={handleModalClose}>
        <GrFormClose />
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

const GoogleBtn = styled.button`
  width: 320px;
  color: white;
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 6px;
  background-color: #4285f4;
  border: none;
  font-weight: 500;
  font-size: 16px;
  padding: 1px;
  margin-bottom: 6rem;
  cursor: pointer;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 14px;
  font-size: 32px;
  padding: 0 4px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
  }
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 28rem;
  height: 32rem;
  background: #fff;
  border-radius: 12px;
  padding: 4rem;
  z-index: 1;
`;
