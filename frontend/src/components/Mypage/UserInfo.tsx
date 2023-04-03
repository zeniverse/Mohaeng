import { UserProps } from "@/src/interfaces/Auth";
import Button from "@/src/components/Button/Button";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store/store";
import React from "react";
import styles from "./UserInfo.module.css";
import { setCurrIdx, myPageState } from "@/src/store/reducers/mypageSlice";
import axios from "axios";
import cookie from "react-cookies";
import {
  setEmail,
  setId,
  setNickname,
  setToken,
} from "@/src/store/reducers/loginTokenSlice";

const UserInfo = () => {
  const dispatch = useDispatch();

  const id = useSelector((state: RootState) => state.id.id);
  const nickName = useSelector((state: RootState) => state.nickName.nickName);
  const email = useSelector((state: RootState) => state.email.email);
  const imageUrl = useSelector(
    (state: RootState) => state.profileUrl.profileUrl
  );

  const accessToken = cookie.load("accessToken");

  const editUser: myPageState = {
    currIdx: 4,
    label: "회원 정보 수정",
  };

  const deleteUser = () => {
    const response = async () => {
      if (accessToken) {
        const userRes = await axios.delete(`api/user/drop`, {
          headers: {
            "Access-Token": accessToken,
          },
          withCredentials: true,
        });
      }

      cookie.remove("accessToken", { path: "/" });
      dispatch(setToken(""));
      dispatch(setNickname(""));
      dispatch(setEmail(""));
      dispatch(setId(0));
    };
    response();
  };

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
        <Button
          type="click"
          text="정보수정"
          onClick={() => dispatch(setCurrIdx(editUser))}
        />

        <Button type="click" text="회원탈퇴" onClick={() => deleteUser()} />
      </div>
    </div>
  );
};

export default UserInfo;
