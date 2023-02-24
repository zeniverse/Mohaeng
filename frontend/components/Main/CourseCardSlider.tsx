"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
      const getCourseData = newData.courseData.data;
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
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {courseData?.map((course) => (
        <SwiperSlide key={uuidv4()}>
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
