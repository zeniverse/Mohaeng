import styles from "./SearchItem.module.css";

import axios from "axios";
import Image from "next/image";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import { useState } from "react";
import { KeywordProps } from "@/src/interfaces/Keyword";
import Bookmark from "../Bookmark/Bookmark";
import FiveStarRating from "../FiveStarRating/FiveStarRating";

export default function SearchItem({
  name,
  firstImage,
  contentId,
  isBookmark,
  rating,
  review,
}: KeywordProps) {
  const router = useRouter();
  const [bookMarked, setBookMarked] = useState(false);

  // 로직 분리
  const handleBookmarkClick = async () => {
    const accessToken = await cookie.load("accessToken");
    try {
      const res = await axios.post(`/api/place/bookmark/${contentId}`, {
        headers: {
          "Access-Token": `${accessToken}`,
          withCredentials: true,
        },
      });
      setBookMarked(!bookMarked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className={styles.keywordItemContainer} key={contentId}>
      <button
        className={styles.keywordItem}
        onClick={() =>
          router.push(
            {
              pathname: `/place/[id]`,
              query: {
                id: contentId,
                name: name,
              },
            },
            `place/${contentId}`
          )
        }
      >
        <Image
          className={styles.img}
          src={firstImage}
          alt={name}
          width={288}
          height={200}
          priority
        />
      </button>
      <div className={styles.keywordInfo}>
        <div className={styles.keywordDesc}>
          <p className={styles.title}>{name}</p>
          <FiveStarRating rating={rating.toString()} />
          <p className={styles.review}>{review}건의 리뷰</p>
        </div>
        <div className={styles.keywordBookmark}>
          <Bookmark bookMarked={bookMarked} onToggle={handleBookmarkClick} />
        </div>
      </div>
    </li>
  );
}
