"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/reducers/modalSlice";
import { useRouter } from "next/router";
import {
  setEmail,
  setId,
  setNickname,
  setProfileUrl,
  setToken,
} from "@/src/store/reducers/loginTokenSlice";
import { AppDispatch, RootState } from "@/src/store/store";
import axios from "axios";
import cookie from "react-cookies";
import SearchBar from "../Search/SearchBar";
import Image from "next/image";
import { resetFilter, selectArea } from "@/src/store/reducers/FilterSlice";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
// import { getCourseBookmark } from "@/src/store/reducers/CourseBoomarkSlice";
import { getPlaceBookmark } from "@/src/store/reducers/PlaceBookmarkSlice";

type User = {
  id: number;
  nickName: string;
  email: string;
};

type Props = {};

function Header({}: Props) {
  const [user, setUser] = useState<User[]>([]);
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const nickName = useSelector((state: RootState) => state.nickName.nickName);
  const accessToken = cookie.load("accessToken");
  const profileUrl = useSelector(
    (state: RootState) => state.profileUrl.profileUrl
  );

  useEffect(() => {
    const response = async () => {
      console.log("ACcess = " + accessToken);
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
        // appDispatch(getCourseBookmark(accessToken));
        appDispatch(getPlaceBookmark(accessToken));
        setUser(nickName);
      }
    };
    response();
  }, [accessToken]);

  const handleOpenLoginModal = () => {
    dispatch(
      openModal({
        modalType: "LoginModal",
        isOpen: true,
      })
    );
  };

  const handleLogout = () => {
    cookie.remove("accessToken", { path: "/" });
    dispatch(setToken(""));
    dispatch(setNickname(""));
    dispatch(setEmail(""));
    dispatch(setProfileUrl(""));
    dispatch(setId(0));
    setUser([]);
    router.replace("/");
    window.alert("로그아웃되었습니다!");
  };

  const ResetStatus = () => {
    dispatch(resetFilter());
  };

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.nav}>
          <Link href="/" onClick={ResetStatus}>
            <img src="/assets/logo.png" alt="logo" className={styles.logo} />
          </Link>

          <SearchBar />

          <div className={styles.menu}>
            <Link href="/place" onClick={ResetStatus}>
              여행지
            </Link>
            <Link href="/course" onClick={ResetStatus}>
              코스
            </Link>
          </div>
        </div>
      </nav>
      <div className={styles.btn}>
        {!nickName ? (
          <>
            <button
              id="login-btn"
              className={styles["login-btn"]}
              onClick={handleOpenLoginModal}
            >
              로그인
            </button>
          </>
        ) : (
          <>
            <Image
              className={styles["kakao-profile-img"]}
              src={profileUrl}
              alt="카카오프로필"
              width={40}
              height={40}
            />
            <Link href="/mypage">{nickName}님</Link>
            <button
              id="login-btn"
              className={styles["login-btn"]}
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
