import { useEffect, useState } from "react";
import styles from "./PlaceDetail.module.css";
import Image from "next/image";
import Review from "../Review/Review";
// import KakaoMap from "../KakaoMap/KakaoMap";
import { useRouter } from "next/router";
import axios from "axios";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setPlaceDetail } from "@/src/store/reducers/placeDetailSlice";
import DetailMap from "./DetailMap";
import FiveStarRating from "../FiveStarRating/FiveStarRating";

// 새로고침 유지 안되는 이유? 1. rewrites? 2. 라우터 초기값 설정 undefined?

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

export default function PlaceDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const [isbookMarked, setIsBookMarked] = useState(false);
  const handleBookmarkClick = () => {
    setIsBookMarked(!isbookMarked);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/place/overview/${id}`, {
          params: {
            id: id,
          },
        });
        dispatch(setPlaceDetail(res.data.data));
        const { content } = res.data.data;
        setPlaceInfo({ ...placeInfo, ...content[0] });
        console.log(placeInfo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, dispatch]);

  return (
    <>
      <section className={styles.placeDetail}>
        <div className={styles.detailHeader}>
          <div className={styles.headerTitle}>
            <h2 className={styles.h2}>{placeInfo.name}</h2>
            <a href="#review">
              <div className={styles.rating}>
                별점 <FiveStarRating rating={placeInfo.rating} />
              </div>
              <p className={styles.review}>건의 리뷰</p>
            </a>
          </div>
          <button
            className={styles.likeBtn}
            onClick={() => handleBookmarkClick()}
          >
            <p className={styles.likeText}>북마크에 추가</p>
            {isbookMarked === true ? (
              <BsFillBookmarkFill className={styles.bookmark} />
            ) : (
              <BsBookmark className={styles.unbookmark} />
            )}
          </button>
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
            <DetailMap latitude={placeInfo.mapY} longitude={placeInfo.mapX} />
          </div>
        </div>
        <div className={styles.detailDesc}>
          <p className={styles.descTitle}>세부 설명 </p>
          <p className={styles.descInfo}>{placeInfo.overview}</p>
        </div>
      </section>

      <div id="review">
        <Review />
      </div>
    </>
  );
}
