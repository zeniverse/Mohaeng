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
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { resetFilter } from "@/src/store/reducers/FilterSlice";
import { myPageState, setCurrIdx } from "@/src/store/reducers/mypageSlice";
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

  const ResetStatus = () => {
    dispatch(resetFilter());

    const currComponent: myPageState = {
      currIdx: 0,
      label: "회원정보",
    };

    dispatch(setCurrIdx(currComponent));
  };

  return (
    <div className={styles.menu}>
      <Link href="/mypage" onClick={ResetStatus}>
        <li className={styles.toli}>
          <FaUserCircle className={styles.mypage} />
          마이페이지
        </li>
      </Link>
      <li className={styles.boli}>
        <p id="login-btn" onClick={handleLogout}>
          <MdLogout className={styles.logout} />
          로그아웃
        </p>
      </li>
    </div>
  );
}
