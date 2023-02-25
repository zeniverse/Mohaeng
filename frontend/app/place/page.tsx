"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import React, { useState } from "react";

type PlaceData = {
  id: string;
  title: string;
  image: string;
};

export default function Place(): JSX.Element {
  const places: PlaceData[] = require("/public/data/place.json");
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
                  width={250}
                  height={150}
                  style={{
                    overflow: "hidden",
                  }}
                />
                <p className={styles.title}>{place.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
