import Image from "next/image";
import styles from "./UserProfile.module.css";
import Dropdown from "../Mypage/Dropdown";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import { useAppSelector } from "@/src/hooks/useReduxHooks";
import { useState } from "react";

const UserProfile = () => {
  const imgUrl = useAppSelector((state) => state.imgUrl.imgUrl);
  const nickName = useAppSelector((state) => state.nickName.nickName);
  const [view, setView] = useState(false);

  return (
    <>
      <ul
        className={styles["dropdown-container"]}
        onClick={() => {
          setView(!view);
        }}
      >
        <div className={styles["kakao-profile"]}>
          <div className={styles["kakao-profile-img-box"]}>
            <Image
              className={styles["kakao-profile-img"]}
              src={imgUrl}
              alt="카카오프로필"
              width={45}
              height={45}
            />
          </div>
          <div className={styles["kakao-profile-info"]}>
            {nickName}
            {view ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />}
          </div>
        </div>
        {view && <Dropdown />}
      </ul>
    </>
  );
};

export default UserProfile;
