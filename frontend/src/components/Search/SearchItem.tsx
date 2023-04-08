import styles from "./SearchItem.module.css";

import axios from "axios";
import Image from "next/image";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { content } from "@/src/store/reducers/searchPlaceSlice";
import { setSearchPlace } from "@/src/store/reducers/searchPlaceSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

export default function SearchItem({
  name,
  firstImage,
  placeId,
  isBookmark,
  contentId,
  rating,
  review,
}: content) {
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();
  const accessToken = cookie.load("accessToken");
  const page = useSelector((state: RootState) => state.page.page);

  const addBookmark = () => {
    const response = async () => {
      await axios.post(
        `/api/place/bookmark/${placeId}`,
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
        .get(`/api/place`, {
          headers: {
            "Access-Token": accessToken,
          },
          params: {
            keyword: keyword,
            page: page,
          },
          withCredentials: true,
        })
        .then((res) => dispatch(setSearchPlace(res.data.data)));
    });
  };

  const delBookmark = () => {
    const response = async () => {
      await axios.delete(`/api/place/bookmark/${placeId}`, {
        headers: {
          "Access-Token": accessToken,
        },
        withCredentials: true,
      });
    };
    response().then(async () => {
      await axios
        .get(`/api/place`, {
          headers: {
            "Access-Token": accessToken,
          },
          params: {
            keyword: keyword,
            page: page,
          },
          withCredentials: true,
        })
        .then((res) => dispatch(setSearchPlace(res.data.data)));
    });
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
          <FiveStarRating rating={rating} />
          <p className={styles.review}>{review}건의 리뷰</p>
        </div>
        <div className={styles.keywordBookmark}>
          {isBookmark === true ? (
            <BsBookmarkFill onClick={delBookmark} className={styles.bookmark} />
          ) : (
            <BsBookmark onClick={addBookmark} className={styles.unbookmark} />
          )}
        </div>
      </div>
    </li>
  );
}
