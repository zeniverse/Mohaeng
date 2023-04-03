import { useEffect, useState } from "react";
import styles from "./PlaceDetail.module.css";
import Image from "next/image";
import Review from "../Review/Review";
// import KakaoMap from "../KakaoMap/KakaoMap";
import { useRouter } from "next/router";
import axios from "axios";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

// id 값을 리덕스에 저장?
interface PlaceInfo {
  name: string;
  areaCode: string;
  firstImage: string;
  contentId: string;
  mapX: string;
  mapY: string;
  overview: string;
}

export default function PlaceDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [placeInfo, setPlaceInfo] = useState<PlaceInfo[]>([]);
  const [bookMarkIcon, setbookMarkIcon] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/place/overview/${id}`, {
          params: {
            id: id,
          },
          withCredentials: true,
        });
        const { content } = res.data.data;
        setPlaceInfo(content[0]);
        console.log(content[0].name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <section className={styles.placeDetail}>
        <div className={styles.detailHeader}>
          <div className={styles.headerTitle}>
            <h2 className={styles.h1}>{placeInfo.name}</h2>
            <a href="#review">
              <p className={styles.rating}>별점 </p>
              <p className={styles.review}>건의 리뷰</p>
            </a>
          </div>
          <button
            className={styles.likeBtn}
            onClick={() => setbookMarkIcon(!bookMarkIcon)}
          >
            <p className={styles.likeText}>북마크에 추가</p>
            {bookMarkIcon === true ? (
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
            {/* <KakaoMap /> */}
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
