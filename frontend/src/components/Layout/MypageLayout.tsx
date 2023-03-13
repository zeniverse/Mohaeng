import styles from "./AppLayout.module.css";
import Sidebar from "@/src/components/Mypage/Sidebar";

const MyPageLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div className={styles.Container}>
        <Sidebar />
        <div className={styles.contentWrapper}>{props.children}</div>
      </div>
    </>
  );
};

export default MyPageLayout;
