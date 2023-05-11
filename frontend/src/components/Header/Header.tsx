import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { openModal } from "../../store/reducers/modalSlice";
import {
  setEmail,
  setId,
  setNickname,
  setImgUrl,
} from "@/src/store/reducers/loginTokenSlice";
import { RootState } from "@/src/store/store";
import axios from "axios";
import cookie from "react-cookies";
import SearchBar from "./SearchBar";

import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { FiMenu } from "react-icons/fi";
import HeaderNav from "./HeaderNav";
import UserProfile from "./UserProfile";
import HeaderLogo from "./HeaderLogo";
type Props = {};

function Header({}: Props) {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const id = useSelector((state: RootState) => state.nickName.nickName);
  const accessToken = cookie.load("accessToken");

  // * 로그인 정보 조회
  useEffect(() => {
    const response = async () => {
      if (accessToken) {
        const userRes = await axios.get(`/loginInfo`, {
          headers: {
            "Access-Token": accessToken,
          },
          withCredentials: true,
        });
        const { id, nickName, email, imgUrl } = userRes.data.data;
        dispatch(setId(id));
        dispatch(setEmail(email));
        dispatch(setNickname(nickName));
        dispatch(setImgUrl(imgUrl));
      }
    };
    response();
  }, [accessToken]);

  // * 로그인 모달
  const handleOpenLoginModal = () => {
    dispatch(
      openModal({
        modalType: "LoginModal",
        isOpen: true,
      })
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <HeaderLogo setActiveLink={setActiveLink} />
        <SearchBar />
        <div className={styles["desktop-only"]}>
          <HeaderNav activeLink={activeLink} setActiveLink={setActiveLink} />
          {id ? (
            <UserProfile />
          ) : (
            <>
              <button
                className={styles["login-btn"]}
                onClick={handleOpenLoginModal}
              >
                로그인
              </button>
            </>
          )}
        </div>

        <div className={`${styles["mobile-only"]} ${styles.menu}`}>
          <FiMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
