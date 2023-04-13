"use client";

import React, { useEffect, useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import cookie from "react-cookies";
import PlaceCard from "@/src/components/Main/PlaceCard";

import "swiper/css";
import "swiper/css/navigation";
import { Place } from "@/src/interfaces/Place";
import axios from "axios";

const PlaceCardSlider = () => {
  const [topTenPlace, setTopTenPlace] = useState([]);

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
        console.log(response);
        setTopTenPlace(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={0}
      slidesPerView={4}
      slidesPerGroup={3}
      navigation
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log("slide change")}
    >
      {/* {topTenPlace?.map((place, idx) => (
        <SwiperSlide key={idx}>
          <PlaceCard
            key={place.id}
            id={place.id}
            placeTitle={place.title}
            placeDesc={place.description}
            placeImg={place.firstimage}
            placeRating={place.rating}
          />
        </SwiperSlide>
      ))} */}
    </Swiper>
  );
};

export default PlaceCardSlider;
