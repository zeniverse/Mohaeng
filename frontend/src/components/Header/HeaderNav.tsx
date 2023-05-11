import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { resetFilter } from "@/src/store/reducers/FilterSlice";
import { myPageState, setCurrIdx } from "@/src/store/reducers/mypageSlice";
import { getCourseListAction } from "@/src/store/thunks/courseThunks";
import Link from "next/link";
import React from "react";
import styles from "./HeaderNav.module.css";

const HeaderNav = ({ activeLink, setActiveLink }: any) => {
  const dispatch = useAppDispatch();

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
  );
};

export default HeaderNav;
