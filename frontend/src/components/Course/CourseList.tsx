import styles from "./CourseList.module.css";

import React, { useEffect, useState } from "react";
import { Course } from "@/src/interfaces/Course";
import CourseItem from "./CourseItem";

const CourseList = () => {
  const [courseData, setCoueseData] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/course`);
      const data = await res.json();
      const aa = await data.data.courseList;
      setCoueseData(aa);
    }
    fetchData();
  }, []);
  return (
    <div className={styles["course-list-container"]}>
      {courseData?.map((course) => (
        <CourseItem
          key={course.id}
          id={course.id}
          courseTitle={course.title}
          courseDesc={course.content}
          courseLike={course.likeCount}
          thumbnailUrl={course.thumbnailUrl}
          courseDays={course.courseDays}
          courseList={course.places}
        />
      ))}
    </div>
  );
};

export default CourseList;
