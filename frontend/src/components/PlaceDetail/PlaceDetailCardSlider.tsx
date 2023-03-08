// "use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./PlaceDetailCardSlider.module.css";

type Image = {
  contentid: string;
  originimgurl: string;
  imgname: string;
  serialnum: string;
};

const PlaceDetailCardSlider = () => {
  const [detailImg, setDetailImg] = useState<Image[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/image");
      const data = await res.json();
      // if (getPlaceData && getPlaceData.length > 5) {
      //   let slicedData = getPlaceData.slice(0, 5);
      //   return setPlaceData(slicedData);
      // }
      setDetailImg(data);
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
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log("slide change")}
    >
      {detailImg?.map((image) => (
        <SwiperSlide key={image.contentid}>
          <Image
            className={styles.image}
            src={image.originimgurl}
            alt={image.imgname}
            width={200}
            height={150}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PlaceDetailCardSlider;
