import styles from "./PlaceDetail.module.css";

import Image from "next/image";
import Review from "../Review/Review";
import DetailMap from "./DetailMap";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import Bookmark from "../Bookmark/Bookmark";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

// 새로고침 유지 안되는 이유? 1. rewrites? 2. 라우터 초기값 설정 undefined?
// 북마크 delete

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

// export async function getServerSideProps({ query }) {
//   const { id } = query;

//   try {
//     const res = await axios.get(`/place/overview/${id}`);
//     const { content } = res.data.data;

//     return {
//       props: {
//         placeInfo: content[0],
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       notFound: true,
//     };
//   }
// }

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
  const [bookMarked, setBookMarked] = useState(false);

  const handleBookmarkClick = async () => {
    const res = await axios.post(`/api/place/bookmark/${id}`);
    setBookMarked(!bookMarked);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/place/overview/${id}`);
        if (res.data.data.content[0] !== {}) {
          const { content } = res.data.data;
          setPlaceInfo({ ...placeInfo, ...content[0] });
        } else {
          console.log(placeInfo);
        }
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
            <a className={styles.moveToReview} href="#review">
              <div className={styles.rating}>
                별점 <FiveStarRating rating={placeInfo.rating} />
              </div>
              <p className={styles.review}>{placeInfo.review}건의 리뷰</p>
            </a>
          </div>
          <div className={styles.bookMarkBox}>
            <p className={styles.bookMarkText}>북마크에 추가</p>
            <Bookmark bookMarked={bookMarked} onToggle={handleBookmarkClick} />
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
