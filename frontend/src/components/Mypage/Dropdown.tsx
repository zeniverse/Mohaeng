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
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { resetFilter } from "@/src/store/reducers/FilterSlice";
import { myPageState, setCurrIdx } from "@/src/store/reducers/mypageSlice";
import { getCourseBookmark } from "@/src/store/reducers/CourseBoomarkSlice";
import { getPlaceBookmark } from "@/src/store/reducers/PlaceBookmarkSlice";
import { getMyCourse } from "@/src/store/reducers/myCourseSlice";
import { getMyReview } from "@/src/store/reducers/myReviewSlice";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";

export default function Dropdown() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const accessToken = cookie.load("accessToken");

  const handleLogout = () => {
    cookie.remove("accessToken", { path: "/" });
    dispatch(setToken(""));
    dispatch(setNickname(""));
    dispatch(setEmail(""));
    dispatch(setImgUrl(""));
    dispatch(setId(0));
    router.replace("/");
    window.alert("로그아웃되었습니다!");
  };

  const ResetStatus = () => {
    dispatch(resetFilter());
    dispatch(getCourseBookmark(accessToken));
    dispatch(getPlaceBookmark(accessToken));
    dispatch(getMyCourse(accessToken));
    dispatch(getMyReview(accessToken));
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
      <li className={styles.boli} onClick={handleLogout}>
        <MdLogout className={styles.logout} />
        로그아웃
      </li>
    </div>
  );
}
