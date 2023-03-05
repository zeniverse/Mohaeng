"use client";

import Button from "@/src/components/Button/Button";
import Sidebar from "@/src/components/Sidebar/Sidebar";
import { User, userData } from "@/src/interfaces/Auth";
import React, { useEffect, useState } from "react";


import styles from "./index.module.css";

const MyPage: React.FC = () => {
  const [currentUser, setUser] = useState<User>();
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      const newData = await res.json();
      const getUserData = newData.userData;
      setUser(getUserData);
    }
    fetchData();
  }, []);

  return (
    <div className={styles["Container"]}>
      <h1 className={styles["Title"]}>마이페이지</h1>
      <Sidebar />
      <div className={styles["ProfileWrapper"]}>
        <div className={styles["Avatar"]} />
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
  );
};

export default MyPage;
