import { UserProps } from "@/src/interfaces/Auth";
import Button from "@/src/components/Button/Button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import React from "react";
import styles from "./UserInfo.module.css";

const UserInfo = ({ id, nickName, email, imageUrl }: UserProps) => {
  return (
    <div className={styles["Container"]}>
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
    </div>
  );
};

export default UserInfo;
