import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./PlaceDetail.module.css";
import { IoMdHeart } from "react-icons/io";
import PlaceDetailCardSlider from "@/src/components/PlaceDetail/PlaceDetailCardSlider";
import KakaoMap from "@/src/components/KakaoMap/KakaoMap";
import Review from "@/src/components/Review/Review";
import { fetchData } from "next-auth/client/_utils";
import { GetServerSideProps } from "next";

const PlaceId = () => {
  const [bookMarkIcon, setbookMarkIcon] = useState(false);
  const { query } = useRouter();
  const router = useRouter();
  // console.log(router.query.params);

  useEffect(() => {
    if (router.isReady) {
      const query = router.query;
      console.log(query);
    }
  }, [router.isReady]);

  return (
    <>
      <section className={styles.placeDetail}>
        <div className={styles.detailHeader}>
          <div className={styles.headerTitle}>
            <h2 className={styles.h1}>{query.title}</h2>
            <a href="#review">
              <p className={styles.rating}>별점 </p>
              <p className={styles.review}>{query.review}건의 리뷰</p>
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
              {query.addr}
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>전화번호 </span>
              {query.tel}
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>운영 시간 </span>
            </p>
            <p className={styles.descInfo}>
              <span className={styles.descTitle}>세부 설명 </span>
              {query.overview}
            </p>
          </div>
          <div className={styles.detailMap} id="map">
            <KakaoMap />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { id } = query;
  return { props: { id } };
};
