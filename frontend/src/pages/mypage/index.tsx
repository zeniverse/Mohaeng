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

const MyPage: React.FC = () => {
  const id = useSelector((state: RootState) => state.id.id);
  const nickName = useSelector((state: RootState) => state.nickName.nickName);
  const email = useSelector((state: RootState) => state.email.email);
  const imageUrl = useSelector(
    (state: RootState) => state.profileUrl.profileUrl
  );
  return (
    <MypageLayout>
      <h1 className={styles["Title"]}>마이페이지</h1>
      {/* <UserInfo
        key={id}
        id={id}
        nickName={nickName}
        email={email}
        imageUrl={imageUrl}
      /> */}
      <UserEdit
        key={id}
        id={id}
        nickName={nickName}
        email={email}
        imageUrl={imageUrl}
      />
    </MypageLayout>
  );
};

export default MyPage;
