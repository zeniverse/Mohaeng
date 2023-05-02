"use client";
import React, { useEffect, useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import cookie from "react-cookies";
import PlaceCard from "@/src/components/Main/PlaceCard";

import "swiper/css";
import "swiper/css/navigation";
import { ITopTenPlace } from "@/src/interfaces/Place";
import axios from "axios";

const PlaceCardSlider = () => {
  const [topTenPlace, setTopTenPlace] = useState<ITopTenPlace[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await cookie.load("accessToken");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/place/main`,
          {
            headers: {
              "Access-Token": accessToken,
              withCredentials: true,
            },
          }
        );
        setTopTenPlace(response.data.data.content);
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
      {topTenPlace.length > 0 &&
        topTenPlace?.map((place, idx) => (
          <SwiperSlide key={idx}>
            <PlaceCard
              key={place.placeId}
              placeId={place.placeId}
              contentId={place.contentId}
              name={place.name}
              firstImage={place.firstImage}
              averageRating={place.averageRating}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default PlaceCardSlider;
