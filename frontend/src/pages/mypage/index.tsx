"use client";

import Button from "@/src/components/Button/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import MypageLayout from "./layout";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import UserInfo from "@/src/components/Mypage/UserInfo";

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
      <UserInfo
        key={id}
        id={id}
        nickName={nickName}
        email={email}
        imageUrl={imageUrl}
      />
      {/* <div className={styles["Container"]}>
        <div className={styles["ProfileWrapper"]}>
          <img src={imageUrl} className={styles["Avatar"]} />
          <div>
            <div className={styles["Name"]}>{id}</div>
            <div className={styles["Nickname"]}>{nickName}</div>
            <div className={styles["Email"]}>{email}</div>
          </div>
        </div>
        <div className={styles["ButtonWrapper"]}>
          <Link href="/mypage/edit">
            <Button text="정보수정" />
          </Link>

          <Button text="회원탈퇴" />
        </div>
      </div> */}
    </MypageLayout>
  );
};

export default MyPage;
