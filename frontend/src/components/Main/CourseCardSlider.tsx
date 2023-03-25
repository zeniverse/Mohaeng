"use client";

import React, { useEffect, useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import CourseCard from "@/src/components/Main/CourseCard";

import "swiper/css";
import "swiper/css/navigation";
import { Course } from "@/src/interfaces/Course";

const CourseCardSlider = () => {
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
            courseDays={course.courseDays}
            courseTitle={course.title}
            courseDesc={course.content}
            thumbnailUrl={course.thumbnailUrl}
            courseLike={course.likeCount}
            courseList={course.places}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CourseCardSlider;
