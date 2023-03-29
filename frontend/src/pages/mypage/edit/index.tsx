import Button from "@/src/components/Button/Button";
import { ButtonBox } from "@/src/components/Button/ButtonStyle";
import { RootState } from "@/src/store/store";
import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyPageLayout from "../layout";
import styles from "./index.module.css";
import { useRouter } from "next/router";

const MyPage: React.FC = () => {
  const router = useRouter();
  const id = useSelector((state: RootState) => state.id.id);
  const nickName = useSelector((state: RootState) => state.nickName.nickName);
  const email = useSelector((state: RootState) => state.email.email);
  const imageUrl = useSelector(
    (state: RootState) => state.profileUrl.profileUrl
  );

  const [editName, setEditName] = useState("");

  const changeEditName = () => {
    console.log("Button Event Test For componetnts");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/mypage");
    // const res = await fetch(`/api/myPage/${email}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     nickName: { editName },
    //     multipartFile: { imageUrl },
    //   }),
    // });
    // const data = await res.json();
    // console.log(data);
  };
  //TODO: oauth를 이용한 정보 수정 가능 항목 -> 랜덤 닉네임과 유저 프로필 사진 (반영하여 수정할 것)
  return (
    <MyPageLayout>
      <h1 className={styles["Title"]}>마이페이지</h1>
      <div className={styles["Container"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles["ProfileWrapper"]}>
            <div>
              <img src={imageUrl} className={styles["Avatar"]} />
            </div>
            <div>
              <div className={styles["Name"]}>{id}</div>
              <div className={styles["FormWrapper"]}>
                <label>
                  닉네임:
                  <input
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
            <Button type="submit" text="수정" />
            <Button text="취소" />
          </div>
        </form>
      </div>
    </MyPageLayout>
  );
};

export default MyPage;
