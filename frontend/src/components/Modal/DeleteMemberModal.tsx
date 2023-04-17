import React from "react";
import styled from "styled-components";
import styles from "./DeleteMemberModal.module.css";
import Button from "@/src/components/Button/Button";
import { closeModal } from "@/src/store/reducers/modalSlice";
import { useDispatch } from "react-redux";
import {
  setToken,
  setNickname,
  setEmail,
  setId,
} from "@/src/store/reducers/loginTokenSlice";
import cookie from "react-cookies";
import axios from "axios";
import { useRouter } from "next/router";

export default function DeleteMemberModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const accessToken = cookie.load("accessToken");

  const handleModalClose = () => {
    dispatch(closeModal());
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
    handleModalClose();
    router.replace("/");
  };

  return (
    <>
      <div className={styles["ContentWrapper"]}>
        <h2>회원 탈퇴</h2>
        <div className={styles["TextWrapper"]}>
          <h3>
            정말 탈퇴하시겠어요? 탈퇴시 회원님이 작성하신 여행 일정과 북마크해둔
            장소들이 영구 삭제됩니다! 🥺
          </h3>
        </div>
        <div className={styles["ButtonWrapper"]}>
          <Button type="click" text="회원탈퇴" onClick={() => deleteUser()} />
          <Button type="click" text="취소" onClick={() => handleModalClose()} />
        </div>
      </div>
    </>
  );
}
