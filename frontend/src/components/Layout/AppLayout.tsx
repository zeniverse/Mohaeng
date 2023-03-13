import styles from "./AppLayout.module.css";
import Footer from "./Footer";
import Header from "./Header";

const AppLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div className={styles.Container}>
        <Header />
        <div className={styles.contentWrapper}>{props.children}</div>

        <footer className={styles.footer}>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default AppLayout;
