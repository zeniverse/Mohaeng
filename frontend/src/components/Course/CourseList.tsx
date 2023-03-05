import styles from "./CourseList.module.css";

import React, { useEffect, useState } from "react";
import { Course } from "@/src/interfaces/Course";
import CourseItem from "./CourseItem";

const CourseList = () => {
  const [courseData, setCoueseData] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/course");
      const data = await res.json();
      setCoueseData(data);
    }
    fetchData();
  }, []);

  return (
    <div className={styles["course-list-container"]}>
      <div className={styles["course-list-body"]}>
        {courseData?.map((course) => (
          <CourseItem
            key={course.id}
            id={course.id}
            courseTitle={course.title}
            courseDesc={course.courseDesc}
            courseLike={course.like}
            courseList={course.items}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
