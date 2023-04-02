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
import Sidebar from "@/src/components/Mypage/Sidebar";

const MyPage: React.FC = () => {
  const currIdx = useSelector((state: RootState) => state.mypage.currIdx);
  const label = useSelector((state: RootState) => state.mypage.label);

  return (
    <div className={styles.Container}>
      <Sidebar />
      <div className={styles.contentWrapper}>
        <h1 className={styles["Title"]}>{label}</h1>
        {{ 0: <UserInfo />, 4: <UserEdit /> }[currIdx]}
      </div>
    </div>
  );
};

export default MyPage;
