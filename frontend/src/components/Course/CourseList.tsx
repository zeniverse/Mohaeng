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
      // const courseRes = await fetch(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/course`
      // );
      // const responseData = await courseRes.json();
      // const courseList = await responseData.data.courseList;
      // setCoueseData(courseList);
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
