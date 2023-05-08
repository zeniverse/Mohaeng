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

type User = {
  id: number;
  nickName: string;
  email: string;
  imgUrl: string;
};

type Props = {};

function Header({}: Props) {
  const [user, setUser] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const userid = useSelector((state: RootState) => state.id.id);
  const nickName = useSelector((state: RootState) => state.nickName.nickName);
  const accessToken = cookie.load("accessToken");
  const imgUrl = useSelector((state: RootState) => state.imgUrl.imgUrl);
  const [view, setView] = useState(false);

  // * 로그인 정보 조회
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
        const { id, nickName, email, imgUrl } = userRes.data.data;
        dispatch(setId(id));
        dispatch(setEmail(email));
        dispatch(setNickname(nickName));
        dispatch(setImgUrl(imgUrl));
        appDispatch(getCourseBookmark(accessToken));
        appDispatch(getPlaceBookmark(accessToken));
        appDispatch(getMyCourse(accessToken));
        appDispatch(getMyReview(accessToken));
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
    dispatch(resetFilter());

    const currComponent: myPageState = {
      currIdx: 0,
      label: "회원정보",
    };

    dispatch(setCurrIdx(currComponent));
  };

  const handleClickCourse = () => {
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
            <Link href="/course" onClick={handleClickCourse}>
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
            <ul
              className={styles.dropdownContainer}
              onClick={() => {
                setView(!view);
              }}
            >
              <Image
                className={styles["kakao-profile-img"]}
                src={imgUrl}
                alt="카카오프로필"
                width={45}
                height={45}
              />
              반가워요, {nickName} 님! {view ? "⌃" : "⌄"}
              {view && <Dropdown />}
            </ul>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
