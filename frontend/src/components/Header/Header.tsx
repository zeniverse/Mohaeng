import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import axios from "axios";
import cookie from "react-cookies";

import { useSelector } from "react-redux";
import { openModal } from "../../store/reducers/modalSlice";
import {
  setEmail,
  setId,
  setNickname,
  setImgUrl,
} from "@/src/store/reducers/loginTokenSlice";
import { RootState } from "@/src/store/store";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";

import { FiMenu } from "react-icons/fi";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

import SearchBar from "./SearchBar";
import HeaderNav from "./HeaderNav";
import UserProfile from "./UserProfile";
import HeaderLogo from "./HeaderLogo";
import Dropdown from "../Mypage/Dropdown";
import HeaderSideMenu from "./HeaderSideMenu";
type Props = {};

function Header({}: Props) {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [view, setView] = useState(false);
  const dispatch = useAppDispatch();

  const id = useSelector((state: RootState) => state.nickName.nickName);

  // * 로그인 정보 조회
  useEffect(() => {
    const response = async () => {
      const accessToken = await cookie.load("accessToken");
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
  }, []);

  // * 로그인 모달
  const handleOpenLoginModal = () => {
    dispatch(
      openModal({
        modalType: "LoginModal",
        isOpen: true,
      })
    );
  };

  const handleOpenMenuModal = () => {
    dispatch(
      openModal({
        modalType: "HeaderSideMenu",
        isOpen: true,
        opacity: 0.4,
      })
    );
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <HeaderLogo setActiveLink={setActiveLink} />
        <SearchBar />
        <div className={styles["desktop-only"]}>
          <HeaderNav activeLink={activeLink} setActiveLink={setActiveLink} />
          {id ? (
            <>
              <div
                className={styles["profile-wrapper"]}
                onClick={() => {
                  setView(!view);
                }}
              >
                <UserProfile />
                {view ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />}
              </div>
              {view && <Dropdown />}
            </>
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

        <div
          className={`${styles["mobile-only"]} ${styles.menu}`}
          onClick={handleOpenMenuModal}
        >
          <FiMenu />
          {mobileMenuOpen && <HeaderSideMenu />}
        </div>
      </div>
    </header>
  );
}

export default Header;
