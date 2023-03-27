import Button from "@/src/components/Button/Button";
import { ButtonBox } from "@/src/components/Button/ButtonStyle";
import { User, userData } from "@/src/interfaces/Auth";
import React, { useEffect, useState } from "react";
import MyPageLayout from "../layout";
import styles from "./index.module.css";

const MyPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/user");
      const data = await res.json();
      setCurrentUser(data);
    }
    fetchData();
  }, []);

  const Img = currentUser?.data.profileUrl;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser?.data.userId,
        name: name,
        nickname: nickname,
        email: email,
      }),
    });
    const data = await res.json();
    setCurrentUser(data);
  };
  //TODO: oauth를 이용한 정보 수정 가능 항목 -> 랜덤 닉네임과 유저 프로필 사진 (반영하여 수정할 것)
  return (
    <MyPageLayout>
      <h1 className={styles["Title"]}>마이페이지</h1>
      <div className={styles["Container"]}>
        <div className={styles["ProfileWrapper"]}>
          <div>
            <img src={Img} className={styles["Avatar"]} />
          </div>
          <div>
            <div className={styles["Name"]}>{currentUser?.data.userId}</div>
            <div className={styles["FormWrapper"]}>
              <form onSubmit={handleSubmit}>
                <label>
                  닉네임:
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </label>
              </form>
            </div>
            <div className={styles["Email"]}>{currentUser?.data.userEmail}</div>
          </div>
        </div>

        <div className={styles["ButtonWrapper"]}>
          <Button type="submit" text="수정" />
          <Button text="취소" />
        </div>
      </div>
    </MyPageLayout>
  );
};

export default MyPage;
