"use client";
interface Place {
  id: string;
  addr1: string;
  firstimage: string;
  title: string;
  description: string;
  rating: string;
}
interface Course {
  id: number;
  title: string;
  courseDesc: string;
  like: number;
  items: items[];
}
interface items {
  courseId: number;
  coursetitle: string;
  content: string;
  imgUrl: string;
}
import bannerImg from "../public/assets/banner-img.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./page.module.css";

import PlaceCard from "@/components/Main/PlaceCard";
import CourseCard from "@/components/Main/CourseCard";

import { AiOutlineSearch } from "react-icons/ai";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

export default function Home() {
  const [placeData, setPlaceData] = useState<Place[]>([]);
  const [courseData, setCoueseData] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      const newData = await res.json();
      const getPlaceData = newData.data1;
      const getCourseData = newData.data2.data;
      setCoueseData(getCourseData);
      // if (getPlaceData && getPlaceData.length > 5) {
      //   let slicedData = getPlaceData.slice(0, 5);
      //   return setPlaceData(slicedData);
      // }
      setPlaceData(getPlaceData);
    }
    fetchData();
  }, []);

  const PreviousBtn = (props: any) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <SlArrowLeft style={{ color: "blue", fontSize: "30px" }} />
      </div>
    );
  };
  const NextBtn = (props: any) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <SlArrowRight style={{ color: "blue", fontSize: "30px" }} />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <main>
      <div className={styles["home-banner-container"]}>
        <div className={styles["banner-search-container"]}>
          <Image className={styles["banner-image"]} src={bannerImg} alt="" />
          <div className={styles["banner-input-container"]}>
            <input type="text" placeholder="어디로 가시나요?" />
            <div className={styles["banner-input-icon"]}>
              <AiOutlineSearch />
            </div>
          </div>
        </div>
      </div>
      {/* TODO: 두 컴포넌트의 형식이 같기 때문에 재사용 가능함. */}
      <div className={styles["home-body-container"]}>
        <div className={styles["home-content-container"]}>
          <section className={styles["topfive-place-container"]}>
            <div className={styles["topfive-place-title"]}>
              <h2>🔥 별점 Top 5 여행지</h2>
            </div>
            <div className={styles["slider-container"]}>
              <Slider
                {...settings}
                prevArrow={<PreviousBtn />}
                nextArrow={<NextBtn />}
              >
                {placeData?.map((place) => (
                  <PlaceCard
                    key={place.id}
                    id={place.id}
                    placeTitle={place.title}
                    placeDesc={place.description}
                    placeImg={place.firstimage}
                    placeRating={place.rating}
                  />
                ))}
              </Slider>
            </div>
          </section>
        </div>
        <section className={styles["recommand-course-container"]}>
          <div className={styles["recommand-course-title"]}>
            <h2>❤️ 추천 코스 </h2>
          </div>
          <div className={styles["recommand-course-card"]}>
            {courseData?.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                courseTitle={course.title}
                courseDesc={course.courseDesc}
                courseLike={course.like}
                courseList={course.items}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
