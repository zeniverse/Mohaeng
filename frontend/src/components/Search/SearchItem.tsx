import styles from "./SearchItem.module.css";

import axios from "axios";
import Image from "next/image";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import { content, setSearchPlace } from "@/src/store/reducers/searchPlaceSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { getPlaceBookmark } from "@/src/store/reducers/PlaceBookmarkSlice";
import PlaceBookmark from "../Bookmark/PlaceBookmark";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

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
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const addBookmark = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/place/bookmark/${placeId}`,
        {},
        {
          headers: {
            "Access-Token": `${accessToken}`,
            withCredentials: true,
          },
        }
      );
      dispatch(setSearchPlace(res.data.data));
      appDispatch(getPlaceBookmark(accessToken));
      setBookmarked(true);
    } catch (error) {
      console.error(error);
    }
  };

  const delBookmark = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/place/bookmark/${placeId}`,
        {
          headers: {
            "Access-Token": `${accessToken}`,
            withCredentials: true,
          },
        }
      );
      dispatch(setSearchPlace(res.data.data));
      appDispatch(getPlaceBookmark(accessToken));
      setBookmarked(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

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
          width={276}
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
          {isBookmarked === true ? (
            <BsBookmarkFill onClick={delBookmark} className={styles.bookmark} />
          ) : (
            <BsBookmark onClick={addBookmark} className={styles.unbookmark} />
          )}
        </div>
      </div>
    </li>
  );
}
{
  /* <PlaceBookmark
  bookMarked={bookMarked}
  onToggle={handleBookmarkClick}
/> */
}
