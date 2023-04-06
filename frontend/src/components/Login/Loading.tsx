import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <section className={styles.loadingBox}>
      <div className={styles.loading}>로그인 중입니다...</div>
    </section>
  );
}
