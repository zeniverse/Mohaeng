import styles from "./SearchItem.module.css";

import axios from "axios";
import Image from "next/image";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import { content } from "@/src/store/reducers/searchPlaceSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useState } from "react";
import Bookmark from "../Bookmark/PlaceBookmark";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { getPlaceBookmark } from "@/src/store/reducers/PlaceBookmarkSlice";
import PlaceBookmark from "../Bookmark/PlaceBookmark";

export default function SearchItem({
  name,
  firstImage,
  placeId,
  isBookmarked,
  contentId,
  averageRating,
  reviewTotalElements,
}: content) {
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const accessToken = cookie.load("accessToken");
  const page = useSelector((state: RootState) => state.page.page);
  const [bookMarked, setBookMarked] = useState(false);

  const handleBookmarkClick = async () => {
    try {
      if (bookMarked === false) {
        const res = await axios
          .post(
            `/api/place/bookmark/${placeId}`,
            {},
            {
              headers: {
                "Access-Token": `${accessToken}`,
                withCredentials: true,
              },
            }
          )
          .then(() => {
            appDispatch(getPlaceBookmark(accessToken));
          });
      } else {
        const res = await axios
          .delete(`/api/place/bookmark/${placeId}`, {
            headers: {
              "Access-Token": `${accessToken}`,
              withCredentials: true,
            },
          })
          .then(() => {
            appDispatch(getPlaceBookmark(accessToken));
          });
      }
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
                contentId: contentId,
                placeId: placeId,
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
          <FiveStarRating rating={averageRating.toString()} />
          <p className={styles.review}>{reviewTotalElements}건의 리뷰</p>
        </div>
        <div className={styles.keywordBookmark}>
          <PlaceBookmark
            bookMarked={bookMarked}
            onToggle={handleBookmarkClick}
          />
        </div>
      </div>
    </li>
  );
}
