import styles from "./MypageLayout.module.css";
import Sidebar from "@/src/components/Mypage/Sidebar";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.Container}>
        <Sidebar />
        <section className={styles.contentWrapper}>{children}</section>
      </div>
    </>
  );
}
