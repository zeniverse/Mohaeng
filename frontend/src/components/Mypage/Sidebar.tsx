import Link from "next/link";
import styles from "./Sidebar.module.css";

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
    { href: "/mybookmark", label: "즐겨찾기" },
    { href: "/trips", label: "나의 여행 일정" },
    { href: "/comments", label: "내가 쓴 댓글" },
    { href: "/posts", label: "내가 쓴 게시글" },
    { href: "/activity", label: "내 활동 알림" },
    { href: "/requests", label: "요청한 장소" },
  ];

  return (
    <div className={styles.sidebar}>
      <ul>
        {links.map((link) => (
          <SidebarLink key={link.href} href={link.href} label={link.label} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
