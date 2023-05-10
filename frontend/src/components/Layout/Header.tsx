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
  setToken,
  setImgUrl,
} from "@/src/store/reducers/loginTokenSlice";
import { AppDispatch, RootState } from "@/src/store/store";
import axios from "axios";
import cookie from "react-cookies";
import SearchBar from "../Search/SearchBar";
import Image from "next/image";
import { resetFilter, selectArea } from "@/src/store/reducers/FilterSlice";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { getPlaceBookmark } from "@/src/store/reducers/PlaceBookmarkSlice";
import { myPageState, setCurrIdx } from "@/src/store/reducers/mypageSlice";
import { getCourseBookmark } from "@/src/store/reducers/CourseBoomarkSlice";
import { getMyCourse } from "@/src/store/reducers/myCourseSlice";
import Dropdown from "../Mypage/Dropdown";
import { getMyReview } from "@/src/store/reducers/myReviewSlice";
import { getCourseListAction } from "@/src/store/thunks/courseThunks";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

type User = {
  id: number;
  nickName: string;
  email: string;
  imgUrl: string;
};

type Props = {};

function Header({}: Props) {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [user, setUser] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userid = useSelector((state: RootState) => state.id.id);
  const nickName = useSelector((state: RootState) => state.nickName.nickName);
  const accessToken = cookie.load("accessToken");
  const imgUrl = useSelector((state: RootState) => state.imgUrl.imgUrl);
  const [view, setView] = useState(false);

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
        dispatch(getCourseBookmark(accessToken));
        dispatch(getPlaceBookmark(accessToken));
        dispatch(getMyCourse(accessToken));
        dispatch(getMyReview(accessToken));
        setUser(nickName);
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

  const ResetStatus = () => {
    setActiveLink(null);
    dispatch(resetFilter());

    const currComponent: myPageState = {
      currIdx: 0,
      label: "회원정보",
    };

    dispatch(setCurrIdx(currComponent));
  };

  const handleClickPlace = () => {
    setActiveLink("place");
    dispatch(resetFilter());

    const currComponent: myPageState = {
      currIdx: 0,
      label: "회원정보",
    };

    dispatch(setCurrIdx(currComponent));
  };
  const handleClickCourse = () => {
    setActiveLink("course");
    dispatch(resetFilter());
    const currComponent: myPageState = {
      currIdx: 0,
      label: "회원정보",
    };
    dispatch(setCurrIdx(currComponent));
    dispatch(getCourseListAction({}));
  };

  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <Link href="/" onClick={ResetStatus}>
          <img src="/assets/logo3.png" alt="logo" className={styles.logo} />
        </Link>
        <SearchBar />
        <div className={styles["desktop-only"]}>
          <div className={styles.nav}>
            <Link
              href="/place"
              onClick={handleClickPlace}
              className={`${styles.link} ${
                activeLink === "place" ? styles.active : ""
              }`}
            >
              여행지
            </Link>
            <Link
              href="/course"
              onClick={handleClickCourse}
              className={`${styles.link} ${
                activeLink === "course" ? styles.active : ""
              }`}
            >
              코스
            </Link>
          </div>
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
              <ul
                className={styles["dropdown-container"]}
                onClick={() => {
                  setView(!view);
                }}
              >
                <div className={styles["kakao-profile"]}>
                  <div className={styles["kakao-profile-img-box"]}>
                    <Image
                      className={styles["kakao-profile-img"]}
                      src={imgUrl}
                      alt="카카오프로필"
                      width={45}
                      height={45}
                    />
                  </div>
                  <div className={styles["kakao-profile-info"]}>
                    {nickName}
                    {view ? (
                      <MdOutlineArrowDropUp />
                    ) : (
                      <MdOutlineArrowDropDown />
                    )}
                  </div>
                </div>
                {view && <Dropdown />}
              </ul>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
