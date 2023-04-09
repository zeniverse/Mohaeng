import styles from "./Dropdown.module.css";
import {
  setEmail,
  setId,
  setNickname,
  setToken,
  setImgUrl,
} from "@/src/store/reducers/loginTokenSlice";
import cookie from "react-cookies";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useDetectClose from "@/src/hooks/useDetectClose";

type User = {
  id: number;
  nickName: string;
  email: string;
  imgUrl: string;
};

export default function Dropdown() {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User[]>([]);
  const router = useRouter();
  const accessToken = cookie.load("accessToken");
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

  const handleLogout = () => {
    cookie.remove("accessToken", { path: "/" });
    dispatch(setToken(""));
    dispatch(setNickname(""));
    dispatch(setEmail(""));
    dispatch(setImgUrl(""));
    dispatch(setId(0));
    setUser([]);
    router.replace("/");
    window.alert("로그아웃되었습니다!");
  };

  return (
    <div className={styles.menu}>
      <li>
        <Link href="/mypage">마이페이지 </Link>
      </li>
      <li>
        <button id="login-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </li>
    </div>
  );
}
