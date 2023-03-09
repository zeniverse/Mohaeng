import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./AppLayout.module.css";

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
