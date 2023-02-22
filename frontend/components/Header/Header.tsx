"use client";

import Link from "next/link";
import React from "react";
import styles from "./header.module.css";
import buttonStyles from "./button.module.css";
import MenuStyles from "./search.module.css";
import LogoStyles from "./logo.module.css";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const StyledIcon = styled(BsSearch)`
  color: #004aad;
`;

type Props = {};

function Header({}: Props) {
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.nav}>
          <Link href="/">
            <img
              src="/assets/logo.png"
              alt="logo"
              className={LogoStyles.logo}
            />
          </Link>
          <div className={MenuStyles["search-bar"]}>
            <input
              className={MenuStyles["search-input"]}
              type="text"
              placeholder="어디 가고 싶으세요?"
            />
            <button className={MenuStyles["search-icon"]}>
              <StyledIcon size={20} />
            </button>
          </div>
          <div className={styles.menu}>
            <Link href="#">여행지</Link>
            <Link href="#">코스</Link>
            <Link href="#">동행 게시판</Link>
          </div>
        </div>
      </nav>
      <div className={styles.btn}>
        <button id="login-btn" className={buttonStyles["login-btn"]}>
          로그인
        </button>
        <button id="signup-btn" className={buttonStyles["signup-btn"]}>
          회원가입
        </button>
      </div>
    </header>
  );
}

export default Header;
