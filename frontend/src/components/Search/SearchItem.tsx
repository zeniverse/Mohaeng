import styles from "./SearchItem.module.css";
import axios from "axios";
import Image from "next/image";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import { setSearchPlace } from "@/src/store/reducers/searchPlaceSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useState } from "react";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { getPlaceBookmark } from "@/src/store/reducers/PlaceBookmarkSlice";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { KeywordProps } from "@/src/interfaces/Keyword";

export default function SearchItem({
  name,
  firstImage,
  placeId,
  isBookmarked,
  contentId,
  averageRating,
  reviewTotalElements,
  onBookmarkUpdate,
}: KeywordProps) {
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const accessToken = cookie.load("accessToken");
  const page = useSelector((state: RootState) => state.page.page);
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const addBookmark = () => {
    const response = async () => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/place/bookmark/${placeId}`,
        {},
        {
          headers: {
            "Access-Token": accessToken,
          },
          withCredentials: true,
        }
      );
    };
    response().then(async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/place`, {
          headers: {
            "Access-Token": accessToken,
          },
          params: {
            keyword: keyword,
            page: page,
          },
          withCredentials: true,
        })
        .then((res) => dispatch(setSearchPlace(res.data.data)))
        .then(() => {
          appDispatch(getPlaceBookmark(accessToken));
          setBookmarked(!isBookmarked);
          onBookmarkUpdate(placeId, true);
        });
    });
  };

  const delBookmark = async () => {
    const response = async () => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/place/bookmark/${placeId}`,
        {
          headers: {
            "Access-Token": accessToken,
          },
          withCredentials: true,
        }
      );
    };
    response().then(async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/place`, {
          headers: {
            "Access-Token": accessToken,
          },
          params: {
            keyword: keyword,
            page: page,
          },
          withCredentials: true,
        })
        .then((res) => dispatch(setSearchPlace(res.data.data)))
        .then(() => {
          appDispatch(getPlaceBookmark(accessToken));
          setBookmarked(!isBookmarked);
          onBookmarkUpdate(placeId, false);
        });
    });
  };

  return (
    <li className={styles.keywordItemContainer} key={contentId}>
      <div
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
      </div>
      <div className={styles.keywordInfo}>
        <div className={styles.keywordDesc}>
          <p className={styles.title}>{name}</p>
          <FiveStarRating rating={averageRating.toString()} />
          <p className={styles.review}>{reviewTotalElements}건의 리뷰</p>
        </div>
        {accessToken && (
          <div className={styles.keywordBookmark}>
            {isBookmarked === true ? (
              <BsBookmarkFill
                onClick={delBookmark}
                className={styles.bookmark}
              />
            ) : (
              <BsBookmark onClick={addBookmark} className={styles.unbookmark} />
            )}
          </div>
        )}
        {/* <div className={styles.keywordBookmark}>
          {isBookmarked === true ? (
            <BsBookmarkFill onClick={delBookmark} className={styles.bookmark} />
          ) : (
            <BsBookmark onClick={addBookmark} className={styles.unbookmark} />
          )}
        </div> */}
      </div>
    </li>
  );
}
