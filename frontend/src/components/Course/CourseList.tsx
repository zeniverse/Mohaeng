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
      {courseData?.map((course) => (
        <CourseItem
          key={course.courseId}
          id={course.courseId}
          courseTitle={course.title}
          courseDesc={course.content}
          courseLike={course.like}
          courseDays={course.courseDays}
          courseList={course.places}
        />
      ))}
    </div>
  );
};

export default CourseList;
