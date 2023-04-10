import styles from "./PlaceDetail.module.css";

import Image from "next/image";

import axios from "axios";
import cookie from "react-cookies";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { getPlaceBookmark } from "@/src/store/reducers/PlaceBookmarkSlice";
import PlaceBookmark from "@/src/components/Bookmark/PlaceBookmark";
import PlaceDetailMap from "@/src/components/PlaceDetail/PlaceDetailMap";
import ReviewList from "@/src/components/Review/ReviewList";
import { useRouterQuery } from "@/src/hooks/useRouterQuery";
import { CANCELLED } from "dns";

// 새로고침 유지 안되는 이유? 1. rewrites? 2. 라우터 초기값 설정 undefined

interface PlaceInfo {
  name: string;
  areaCode: string;
  firstImage: string;
  contentId: string;
  mapX: string;
  mapY: string;
  overview: string;
  rating: string;
  review: string;
}

export default function PlaceId() {
  const accessToken = cookie.load("accessToken");
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const { placeId, contentId } = router.query;
  const [placeInfo, setPlaceInfo] = useState<PlaceInfo>({
    name: "",
    areaCode: "",
    firstImage: "",
    contentId: "",
    mapX: "",
    mapY: "",
    overview: "",
    rating: "",
    review: "",
  });

  const [bookMarked, setBookMarked] = useState(false);

  // * 북마크
  const handleBookmarkClick = async () => {
    try {
      if (bookMarked === false) {
        const res = await axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/place/bookmark/${placeId}`,
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
          .delete(
            `${process.env.NEXT_PUBLIC_API_URL}/api/place/bookmark/${placeId}`,
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
      }
      setBookMarked(!bookMarked);
    } catch (error) {
      console.error(error);
    }
  };

  // * 상세 데이터
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/place/overview/${contentId}`,
          {
            headers: {
              "Access-Token": `${accessToken}`,
              withCredentials: true,
            },
          }
        );
        if (res.data.data.content[0] !== {}) {
          const { content } = res.data.data;
          setPlaceInfo({ ...placeInfo, ...content[0] });
          setBookMarked(res.data.data.isBookmarked);
          console.log(res.data.data);
          console.log(res.data.data.isBookmarked);
        } else {
          console.log(placeInfo);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [placeId]);

  return (
    <>
      <section className={styles.placeDetail}>
        <div className={styles.detailHeader}>
          <div className={styles.headerTitle}>
            <h2 className={styles.h2}>{placeInfo.name}</h2>
          </div>
          <div className={styles.bookMarkBox}>
            <p className={styles.bookMarkText}>북마크에 추가</p>
            <PlaceBookmark
              bookMarked={bookMarked}
              onToggle={handleBookmarkClick}
            />
          </div>
        </div>
        <div className={styles.detailContent}>
          <div className={styles.imgBox}>
            <Image
              className={styles.img}
              src={placeInfo.firstImage}
              width={500}
              height={350}
              alt={placeInfo.name}
            />
          </div>
          <div className={styles.detailMap} id="map">
            <PlaceDetailMap
              latitude={placeInfo.mapY}
              longitude={placeInfo.mapX}
            />
          </div>
        </div>
        <div className={styles.detailDesc}>
          <p className={styles.descTitle}>세부 설명 </p>
          <p className={styles.descInfo}>{placeInfo.overview}</p>
        </div>
      </section>
      <div id="review">
        <ReviewList />
      </div>
    </>
  );
}
