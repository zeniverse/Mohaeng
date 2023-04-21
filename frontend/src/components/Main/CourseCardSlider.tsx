"use client";

import React, { useEffect, useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import CourseCard from "@/src/components/Main/CourseCard";
import cookie from "react-cookies";

import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { IRecommandCourse } from "@/src/interfaces/Course.type";

const CourseCardSlider = () => {
  const [recommandCourse, setRecommandCourse] = useState<IRecommandCourse[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await cookie.load("accessToken");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/course/main`,
          {
            headers: {
              "Access-Token": accessToken,
              withCredentials: true,
            },
          }
        );
        setRecommandCourse(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const updateRecommandCourse = (updatedCourse: IRecommandCourse) => {
    const updatedCourses = recommandCourse.map((course) => {
      if (course.courseId === updatedCourse.courseId) {
        return updatedCourse;
      } else {
        return course;
      }
    });
    setRecommandCourse(updatedCourses);
  };

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={0}
      slidesPerView={4}
      slidesPerGroup={3}
      navigation
    >
      {recommandCourse.length > 0 &&
        recommandCourse?.map((course, idx) => (
          <SwiperSlide key={idx}>
            <CourseCard
              key={course.courseId}
              courseId={course.courseId}
              title={course.title}
              content={course.content}
              thumbnailUrl={course.thumbnailUrl}
              likeCount={course.likeCount}
              isLiked={course.isLiked}
              onUpdateCourse={updateRecommandCourse}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default CourseCardSlider;
