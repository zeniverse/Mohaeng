"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import PlaceCard from "@/components/Main/PlaceCard";

import "swiper/css";
import "swiper/css/navigation";
import "../../styles/slider.css";
import { Place } from "@/interfaces/Place";

const PlaceCardSlider = () => {
  const [placeData, setPlaceData] = useState<Place[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      const newData = await res.json();
      const getPlaceData = newData.placeData;
      // if (getPlaceData && getPlaceData.length > 5) {
      //   let slicedData = getPlaceData.slice(0, 5);
      //   return setPlaceData(slicedData);
      // }
      setPlaceData(getPlaceData);
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
      {placeData?.map((place) => (
        <SwiperSlide key={uuidv4()}>
          <PlaceCard
            key={place.id}
            id={place.id}
            placeTitle={place.title}
            placeDesc={place.description}
            placeImg={place.firstimage}
            placeRating={place.rating}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PlaceCardSlider;
