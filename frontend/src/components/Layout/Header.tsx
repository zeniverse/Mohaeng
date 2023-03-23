"use client";

import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";
import { BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/reducers/modalSlice";
import Image from "next/image";

const StyledIcon = styled(BsSearch)`
  color: #004aad;
`;

type Props = {};

function Header({}: Props) {
  const dispatch = useDispatch();

  const handleOpenLoginModal = () => {
    dispatch(
      openModal({
        modalType: "LoginModal",
        isOpen: true,
      })
    );
  };
  const handleOpenBasicModal = () => {
    dispatch(
      openModal({
        modalType: "BasicModal",
        isOpen: true,
      })
    );
  };

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.nav}>
          <Link href="/">
            <img src="/assets/logo.png" alt="logo" className={styles.logo} />
          </Link>
          <div className={styles["search-bar"]}>
            <input
              className={styles["search-input"]}
              type="text"
              placeholder="어디 가고 싶으세요?"
            />
            <button className={styles["search-icon"]}>
              <StyledIcon size={20} />
            </button>
          </div>
          <div className={styles.menu}>
            <Link href="#">여행지</Link>
            <Link href="course">코스</Link>
            {/* <Link href="#">동행 게시판</Link> */}
            <Link href="/mypage">마이페이지</Link>
          </div>
        </div>
      </nav>
      <div className={styles.btn}>
        <button
          id="login-btn"
          className={styles["login-btn"]}
          onClick={handleOpenLoginModal}
          // onClick={() => signIn("kakao")}
        >
          로그인
        </button>
        {/* {!session ? (
          <>
            
          </>
        ) : (
          <>
            <Image
              className={styles["kakao-profile-img"]}
              src={session.user?.image}
              alt="카카오프로필"
              width={40}
              height={40}
            />
            {session.user?.name}님
            <button
              id="login-btn"
              className={styles["login-btn"]}
              // onClick={handleOpenLoginModal}
              onClick={() => signOut()}
            >
              로그아웃
            </button>
          </>
        )} */}
        <button
          id="signup-btn"
          className={styles["signup-btn"]}
          onClick={handleOpenBasicModal}
        >
          기본 모달
        </button>
      </div>
    </header>
  );
}

export default Header;
