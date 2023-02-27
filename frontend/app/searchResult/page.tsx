"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import React, { useState } from "react";

type KeywordData = {
  id: string;
  title: string;
  image: string;
  review: number;
};

export default function SearchResult(): JSX.Element {
  const places: KeywordData[] = require("/public/data/keyword.json");

  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.h2}>검색하신 결과 </h2>
        <ul className={styles.placeList}>
          {places?.map((place) => (
            <li className={styles.item} key={place.id}>
              <Link className={styles.Link} href={`/place/${place.id}`}>
                <Image
                  className={styles.img}
                  src={place.image}
                  alt={place.title}
                  width={257}
                  height={233}
                />
                <span className={styles.textBlock}>
                  <p className={styles.title}>{place.title}</p>
                  <p className={styles.review}>{place.review}건의 리뷰</p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
