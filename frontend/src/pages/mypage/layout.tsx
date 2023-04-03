import styles from "./layout.module.css";
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
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </>
  );
}
