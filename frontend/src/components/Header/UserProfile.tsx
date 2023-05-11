import Image from "next/image";
import styles from "./UserProfile.module.css";
import Dropdown from "../Mypage/Dropdown";
import { useAppSelector } from "@/src/hooks/useReduxHooks";
import { useState } from "react";

const UserProfile = () => {
  const imgUrl = useAppSelector((state) => state.imgUrl.imgUrl);
  const nickName = useAppSelector((state) => state.nickName.nickName);

  return (
    <>
      <ul className={styles["profile-container"]}>
        <div className={styles["profile-img-box"]}>
          <Image
            className={styles["profile-img"]}
            src={imgUrl}
            alt="카카오프로필"
            width={45}
            height={45}
          />
        </div>
        <div className={styles["profile-name"]}>{nickName}</div>
      </ul>
    </>
  );
};

export default UserProfile;
