import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import styles from "./PlaceDetail.module.css";
import { IoMdHeart } from "react-icons/io";
import PlaceDetailCardSlider from "@/src/components/PlaceDetail/PlaceDetailCardSlider";
import KakaoMap from "@/src/components/KakaoMap/KakaoMap";
import Review from "@/src/components/Review/Review";
import { GrOverview } from "react-icons/gr";

export function getServerSideProps() {
  return {
    props: {},
  };
}

const PlaceId = () => {
  const router = useRouter();
  // const [addr, id, image, mapx, mapy, tel, title, review] = params;
  // const [placeId, setPlaceId] = useState<number>();
  // useEffect(() => {
  //   const { addr, id, image, mapx, mapy, tel, title, overview, review } =
  //     router.query;
  //   if (placeId) setPlaceId(placeId as number);
  // }, [router.query]);
  console.log(router.query);
  const [bookMarkIcon, setbookMarkIcon] = useState(false);

  return (
    <>
      <section className={styles.placeDetail}>
        <div className={styles.detailHeader}>
          <div className={styles.headerTitle}>
            <h2 className={styles.h1}>{router.query.title}</h2>
            <a href="#review">
              <p className={styles.rating}>별점 </p>
              <p className={styles.review}>{router.query.review}건의 리뷰</p>
            </a>
          </div>
          <button
            className={styles.likeBtn}
            onClick={() => setbookMarkIcon(!bookMarkIcon)}
          >
            <p className={styles.likeText}>즐겨찾기</p>
            {bookMarkIcon === true ? (
              <IoMdHeart className={styles.bookmark} />
            ) : (
              <IoMdHeart className={styles.unbookmark} />
            )}
          </button>
        </div>
        <div className={styles.imgSlider}>
          <PlaceDetailCardSlider />
        </div>
        <div className={styles.detailContent}>
          <div className={styles.detailDesc}>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>주소 </span>
              {router.query.addr}
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>전화번호 </span>
              {router.query.tel}
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>운영 시간 </span>
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>세부 설명 </span>
              {router.query.overview}
            </p>
          </div>
          <div className={styles.detailMap} id="map">
            {/* <KakaoMap /> */}
          </div>
        </div>
      </section>

      <div id="review">
        <Review />
      </div>
    </>
  );
};

export default PlaceId;
