"use client";

import Image from "next/image";
import styles from "./SearchResult.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Keyword = {
  addr: string;
  id: string;
  image: string;
  mapx: string;
  mapy: string;
  tel: string;
  title: string;
  review: number;
};

// useEffect(() => {
//   const handler = async () => {
//     const response = await fetch("/api/keyword", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await response.json();
//     console.log(data);
//   };
//   handler();
// }, []);
export default function SearchPlace(): JSX.Element {
  const [keywordData, setkeywordData] = useState<Keyword[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      const newData = await res.json();
      const getKeywordData = newData.keywordData;
      setkeywordData(getKeywordData);
    }
    fetchData();
  }, []);

  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.h2}>검색하신 결과 </h2>
        <ul className={styles.keywordList}>
          {keywordData?.map((keyword) => (
            <li className={styles.item} key={keyword.id}>
              <Link className={styles.Link} href={`/place/${keyword.id}`}>
                <Image
                  className={styles.img}
                  src={keyword.image}
                  alt={keyword.title}
                  width={257}
                  height={233}
                />
                <span className={styles.keywordInfo}>
                  <p className={styles.title}>{keyword.title}</p>
                  <p className={styles.review}>{keyword.review}건의 리뷰</p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
