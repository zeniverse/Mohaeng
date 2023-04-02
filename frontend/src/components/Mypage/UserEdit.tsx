import { UserProps } from "@/src/interfaces/Auth";
import Button from "@/src/components/Button/Button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import React, { useState } from "react";
import styles from "./userEdit.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const UserEdit = ({ id, nickName, email, imageUrl }: UserProps) => {
  const router = useRouter();

  const [editName, setEditName] = useState("");

  const changeEditName = () => {
    console.log("Button Event Test For componetnts");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("A");
    const response = async () => {
      const editResponse = await axios
        .put(`/api/myPage/${email}`, {
          nickName: editName,
          multipartFile: null,
          withCredentials: true,
        })
        // .get(`/places`, {
        //   params: {
        //     areaCode: 1,
        //     page: 1,
        //   },
        //   withCredentials: true,
        // })
        .then((res) => console.log(res));
    };
    response();
    router.push("/mypage");
  };

  return (
    <div className={styles["Container"]}>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className={styles["ProfileWrapper"]}>
          <div>
            <img src={imageUrl} className={styles["Avatar"]} />
          </div>
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
          <Button text="취소" />
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
