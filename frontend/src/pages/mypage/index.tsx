"use client";

import Button from "@/src/components/Button/Button";
import MyPageLayout from "@/src/components/Layout/MypageLayout";
import SidebarLayout from "@/src/components/Layout/SidebarLayout";
import Sidebar from "@/src/components/Mypage/Sidebar";
import { User, userData } from "@/src/interfaces/Auth";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

const MyPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/user");
      const data = await res.json();
      setCurrentUser(data);
    }
    fetchData();
  }, []);

  const Img = currentUser?.data.profileUrl;
  return (
    <MyPageLayout>
      <div className={styles["Container"]}>
        <h1 className={styles["Title"]}>마이페이지</h1>

        <div className={styles["ProfileWrapper"]}>
          <img src={Img} className={styles["Avatar"]} />
          <div>
            <div className={styles["Name"]}>{currentUser?.data.userId}</div>
            <div className={styles["Nickname"]}>
              {currentUser?.data.userNickname}
            </div>
            <div className={styles["Email"]}>{currentUser?.data.userEmail}</div>
          </div>
        </div>
        <div className={styles["ButtonWrapper"]}>
          <Button text="정보수정" />
          <Button text="회원탈퇴" />
        </div>
      </div>
    </MyPageLayout>
  );
};

export default MyPage;
