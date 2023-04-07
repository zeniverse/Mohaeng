import { UserProps } from "@/src/interfaces/Auth";
import Button from "@/src/components/Button/Button";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store/store";
import React, { useEffect, useState } from "react";
import styles from "./userEdit.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { myPageState, setCurrIdx } from "@/src/store/reducers/mypageSlice";
import { json } from "stream/consumers";
import cookie from "react-cookies";
import {
  setEmail,
  setId,
  setNickname,
  setProfileUrl,
} from "@/src/store/reducers/loginTokenSlice";

interface Uploader {
  nickName: string;
}

const UserEdit = () => {
  const id = useSelector((state: RootState) => state.id.id);
  const nickName = useSelector((state: RootState) => state.nickName.nickName);
  const email = useSelector((state: RootState) => state.email.email);
  const imageUrl = useSelector(
    (state: RootState) => state.profileUrl.profileUrl
  );
  const accessToken = cookie.load("accessToken");

  const dispatch = useDispatch();
  const router = useRouter();

  const cancelEdit: myPageState = {
    currIdx: 0,
    label: "회원 정보",
  };

  const [editName, setEditName] = useState("");

  const changeEditName = () => {
    console.log("Button Event Test For componetnts");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("multipartFile", "git.png");
    const nickName: Uploader = { nickName: editName };
    formData.append(
      "nickName",
      new Blob([JSON.stringify(nickName)], {
        type: "application/json",
      })
    );

    const response = async () => {
      if (accessToken) {
        const editResponse = await axios.put(`/api/myPage/${email}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Token": accessToken,
          },
        });
      }
    };
    response().then(async () => {
      if (accessToken) {
        const userRes = await axios.get(`/loginInfo`, {
          headers: {
            "Access-Token": accessToken,
          },
          withCredentials: true,
        });
        const { id, nickName, email, profileUrl } = userRes.data.data;
        dispatch(setId(id));
        dispatch(setEmail(email));
        dispatch(setNickname(nickName));
        dispatch(setProfileUrl(profileUrl));
      }
    });
    dispatch(setCurrIdx(cancelEdit));
  };

  return (
    <div className={styles["Container"]}>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className={styles["ProfileWrapper"]}>
          <img src={imageUrl} className={styles["Avatar"]} />
          <div>
            <div className={styles["Name"]}>{id}</div>
            <div className={styles["FormWrapper"]}>
              <label>
                <input
                  className={styles["Input"]}
                  type="text"
                  value={editName}
                  placeholder={nickName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </label>
            </div>
            <div className={styles["Email"]}>{email}</div>
          </div>
        </div>
        <div className={styles["ButtonWrapper"]}>
          <Button type="submit" text="수정" onClick={changeEditName} />
          <Button
            type="click"
            text="취소"
            onClick={() => dispatch(setCurrIdx(cancelEdit))}
          />
        </div>
      </form>
    </div>
  );
};

export default UserEdit;