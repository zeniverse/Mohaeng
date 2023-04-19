import CourseForm from "@/src/components/Course/CourseForm";
import styles from "./index.module.css";

export default function index() {
  return (
    <div className={styles.Container}>
      <CourseForm isEditMode={false} />
    </div>
  );
}
