import { useState } from "react";
import styles from "./ToastModal.module.css";

type ToastProps = {
  message: string;
};

export default function ToastModal({ message }: ToastProps) {
  const [showToast, setShowToast] = useState(true);

  function handleToastClose() {
    setShowToast(false);
  }

  setTimeout(() => {
    setShowToast(false);
  }, 3000);

  return (
    <section className={styles.toastContainer}>
      {showToast && (
        <div className={styles.toastBox}>
          <p>{message}</p>
        </div>
      )}
    </section>
  );
}
