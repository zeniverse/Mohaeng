"use client";

import React, { useEffect, useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import CourseCard from "@/components/Main/CourseCard";

import "swiper/css";
import "swiper/css/navigation";
import "../../styles/slider.css";
import { Course } from "@/interfaces/Course";

const CourseCardSlider = () => {
  const [courseData, setCoueseData] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      const newData = await res.json();
      const getCourseData = newData.courseData;
      setCoueseData(getCourseData);
    }
    fetchData();
  }, []);

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={0}
      slidesPerView={4}
      slidesPerGroup={3}
      navigation
    >
      {courseData?.map((course, idx) => (
        <SwiperSlide key={idx}>
          <CourseCard
            key={course.id}
            id={course.id}
            courseTitle={course.title}
            courseDesc={course.courseDesc}
            courseLike={course.like}
            courseList={course.items}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CourseCardSlider;
