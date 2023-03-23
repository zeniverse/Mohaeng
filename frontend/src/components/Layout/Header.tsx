"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "./Header.module.css";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/reducers/modalSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  setEmail,
  setId,
  setNickname,
  setToken,
} from "@/src/store/reducers/loginTokenSlice";
import { RootState } from "@/src/store/store";
import axios from "axios";

const StyledIcon = styled(BsSearch)`
  color: #004aad;
`;

type Props = {};

function Header({}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const loginToken = useSelector((state: RootState) => state.token.token);
  const nickName = useSelector((state: RootState) => state.nickName.nickName);

  // useEffect(() => {
  //   const getResponse = async () => {
  //     if (loginToken) {
  //       // axios.defaults.headers.common["Access-Token"] =
  //       //   localStorage.getItem("accessToken");
  //       const getUser = await axios.get(`http://219.255.1.253:8080/loginInfo`, {
  //         headers: {
  //           "Access-Token": `${loginToken}`,
  //         },
  //       });
  //       console.log();
  //       dispatch(setNickname(getUser.data.nickName));
  //     }
  //   };
  //   getResponse();
  // }, [loginToken]);

  const handleOpenLoginModal = () => {
    dispatch(
      openModal({
        modalType: "LoginModal",
        isOpen: true,
      })
    );
  };

  const handleLogout = () => {
    localStorage.clear(); // 토큰 삭제, removeItem
    dispatch(setToken(""));
    dispatch(setNickname(""));
    dispatch(setEmail(""));
    dispatch(setId(0));
    router.replace("/");
    window.alert("로그아웃되었습니다!");
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
            <Link href="/place">여행지</Link>
            <Link href="/course">코스</Link>
            <Link href="/mypage">마이페이지</Link>
          </div>
        </div>
      </nav>
      <div className={styles.btn}>
        {!loginToken ? (
          <>
            <button
              id="login-btn"
              className={styles["login-btn"]}
              onClick={handleOpenLoginModal}
            >
              로그인
            </button>
          </>
        ) : (
          <>
            {nickName}
            <button
              id="login-btn"
              className={styles["login-btn"]}
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </header>
  );
}

{
  /* <Image
              className={styles["kakao-profile-img"]}
              src={session.user?.image}
              alt="카카오프로필"
              width={40}
              height={40} /> */
}

export default Header;
