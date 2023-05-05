import styles from "./courseDetail.module.css";

import CourseDetailNav from "@/src/components/CourseDetail/CourseDetailNav";
import CourseDetailContent from "@/src/components/CourseDetail/CourseDetailContent";
import CourseDetailHead from "@/src/components/CourseDetail/CourseDetailHead";

function CourseDetail() {
  return (
    <>
      <div className={styles["course-id-container"]}>
        <CourseDetailHead />
        <CourseDetailNav />
        <CourseDetailContent />
      </div>
    </>
  );
}

export default CourseDetail;
