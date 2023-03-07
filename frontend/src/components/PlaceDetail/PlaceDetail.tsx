"use client";
import React, { useState } from "react";
import styles from "./PlaceDetail.module.css";
import { IoMdHeart } from "react-icons/io";
import Image from "next/image";
import Review from "../Review/Review";
import KakaoMap from "../KakaoMap/KakaoMap";

export default function PlaceDetail() {
  const [btn, setBtn] = useState();
  return (
    <>
      <section className={styles.placeDetail}>
        <div className={styles.detailHeader}>
          <div className={styles.headerTitle}>
            <h2 className={styles.h1}>여행지 이름</h2>
            <a href="#review">
              <p className={styles.rating}>별점 </p>
              <p className={styles.review}>12건의 리뷰</p>
            </a>
          </div>
          <button className={styles.likeBtn}>
            <p className={styles.likeText}>즐겨찾기</p>
            <IoMdHeart className={styles.likeIcon} />
          </button>
        </div>
        <div className={styles.imgSlider}>
          <Image
            src="http://tong.visitkorea.or.kr/cms/resource/77/2709977_image2_1.jpg"
            alt="테스트 이미지"
            width={220}
            height={190}
            className={styles.imgCard}
            // 슬라이더 사용
          />
        </div>
        <div className={styles.detailContent}>
          <div className={styles.detailDesc}>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>주소 </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem, odio incidunt temporibus similique qui rem quod
              cupiditate obcaecati molestiae? Reiciendis distinctio rem odit,
              aliquam dolore minus iusto enim. Voluptatum, labore.
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>전화번호 </span>
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>운영 시간 </span>
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>세부 설명</span>
            </p>
          </div>
          <div className={styles.detailMap} id="map">
            <KakaoMap />
          </div>
        </div>
      </section>
      {/* 
      <div id="review">
        <Review />
      </div> */}
    </>
  );
}
