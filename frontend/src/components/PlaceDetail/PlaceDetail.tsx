"use client";
import React from "react";
import styles from "./PlaceDetail.module.css";
import { IoMdHeart } from "react-icons/io";
import Image from "next/image";
import Review from "../Review/Review";

export default function PlaceDetail() {
  return (
    <>
      <section className={styles.placeDetail}>
        <div className={styles.detailTitle}>
          <div className={styles.titleBox}>
            <h1 className={styles.h1}>여행지 이름</h1>
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
        <div className={styles.detailContent}>
          <Image
            src="/noImage.png"
            alt="no image"
            width={200}
            height={150}
            className={styles.imgCard}
          />
          <div className={styles.detailDesc}>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>여행지 이름</span> Lorem ipsum,{" "}
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>주소</span> Lorem ipsum,{" "}
            </p>
            <p className={styles.descInfo}>
              <span>세부 설명</span> Minus voluptatum officia deleniti amet
              nihil voluptas commodi eos odit eveniet. Sapiente dolore
              laudantium, blanditiis sequi ea vitae odio aliquam provident
              neque.
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>여행지 이름</span> Lorem ipsum,{" "}
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>전화번호</span> Lorem ipsum,{" "}
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>운영 시간</span> Lorem ipsum,{" "}
            </p>
          </div>
        </div>
      </section>

      <div id="review">
        <Review />
      </div>
    </>
  );
}
