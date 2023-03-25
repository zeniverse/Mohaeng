import Link from "next/link";
import styles from "./Sidebar.module.css";
import { User, userData } from "@/src/interfaces/Auth";
import React, { useEffect, useState } from "react";

interface SidebarLinkProps {
  href: string;
  label: string;
}

const SidebarLink = ({ href, label }: SidebarLinkProps) => {
  return (
    <li className={styles["sidebar__list"]}>
      <Link href={href} style={{ textDecoration: "none" }} passHref>
        <button className={styles["sidebar__button"]}>{label}</button>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const links: SidebarLinkProps[] = [
    { href: "/mypage", label: "회원정보" },
    { href: "/mypage/bookmark", label: "즐겨찾기" },
    { href: "/mypage/trips", label: "나의 여행 일정" },
    { href: "/mypage/post", label: "내가 쓴 글" },
    { href: "/activity", label: "내 활동 알림" },
    { href: "/requests", label: "요청한 장소" },
  ];

  const [currentUser, setCurrentUser] = useState<User>();
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/user");
      const data = await res.json();
      setCurrentUser(data);
    }
    fetchData();
  }, []);
  const Img = currentUser?.data.profileUrl;

  return (
    <div className={styles.sidebar}>
      <ul>
        <div className={styles["ProfileWrapper"]}>
          <img src={Img} className={styles["Avatar"]} />
          <div>
            <div className={styles["Nickname"]}>
              {currentUser?.data.userNickname}
            </div>
          </div>
        </div>
        {links.map((link) => (
          <SidebarLink key={link.href} href={link.href} label={link.label} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
