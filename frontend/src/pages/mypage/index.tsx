"use client";

import Button from "@/src/components/Button/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import MypageLayout from "./layout";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import UserInfo from "@/src/components/Mypage/UserInfo";
import UserEdit from "@/src/components/Mypage/UserEdit";
import UserBookmark from "@/src/components/Mypage/UserBookmark";
import Sidebar from "@/src/components/Mypage/Sidebar";
import { useRouter } from "next/router";
import cookie from "react-cookies";

const MyPage: React.FC = () => {
  const currIdx = useSelector((state: RootState) => state.mypage.currIdx);
  const label = useSelector((state: RootState) => state.mypage.label);
  const accessToken = cookie.load("accessToken");

  const router = useRouter();

  //TODO: 로그인 페이지 완성시 경로 '/login'으로 바꿔두기
  useEffect(() => {
    if (!accessToken) {
      router.replace("/");
    }
  }, [accessToken]);

  return (
    <div className={styles.Container}>
      <Sidebar />
      <div className={styles.contentWrapper}>
        <h1 className={styles["Title"]}>{label}</h1>
        <div className={styles.itemWrapper}>
          {{ 0: <UserInfo />, 1: <UserBookmark />, 4: <UserEdit /> }[currIdx]}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
