import { CourseDetailType, kakaoPlaces } from "@/src/interfaces/Course";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "./courseDetail.module.css";
import { BiMapAlt, BiShareAlt, BiBookmarkPlus } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";
import KakaoMap from "@/src/components/KakaoMap/KakaoMap";
import Image from "next/image";

const initialData = {
  title: "",
  nickname: "",
  likeCount: "",
  courseDays: "",
  region: "",
  content: "",
  createdDate: "",
  places: [],
};

export default function CourseDetail() {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  // const timeAgoFn = useCallback((a: Date) => {
  //   const now: Date = new Date();
  //   const milliSeconds = now.getTime() - a.getTime();
  //   const seconds = milliSeconds / 1000;
  //   // 3분까지는 방금전으로 표시
  //   if (seconds < 180) return `방금 전`;
  //   const minutes = seconds / 60;
  //   if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  //   const hours = minutes / 60;
  //   if (hours < 24) return `${Math.floor(hours)}시간 전`;
  //   const days = hours / 24;
  //   if (days < 7) return `${Math.floor(days)}일 전`;
  //   const weeks = days / 7;
  //   if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  //   const months = days / 30;
  //   if (months < 12) return `${Math.floor(months)}개월 전`;
  //   const years = days / 365;
  //   return `${Math.floor(years)}년 전`;
  // }, []);

  const [courseDetail, setcourseDetail] =
    useState<CourseDetailType>(initialData);
  const {
    title,
    nickname,
    likeCount,
    courseDays,
    region,
    content,
    createdDate,
    places,
  }: CourseDetailType = courseDetail;
  const [formattedDate, setFormattedDate] = useState("");
  // const [timeAgoDate, setTimeAgoDate] = useState("");
  // const [isRoughMapOpen, setIsRoughMapOpen] = useState(false);
  // const RoughMapData: string[] = places?.map((place: any) => place.name);

  // const handleMouseEnter = () => {
  //   setIsRoughMapOpen(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsRoughMapOpen(false);
  // };

  useEffect(() => {
    const fetchCourseData = async (id: string) => {
      const response = await fetch(`/api/courseDetail?id=${id}`);
      const courseData = await response.json();
      setcourseDetail(courseData);
    };

    if (id) {
      fetchCourseData(id);
    }
  }, [id]);
  function getFomattedDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  }

  // useEffect(() => {
  //   const agoDate = timeAgoFn(new Date(createdDate));
  //   setTimeAgoDate(agoDate);
  // }, [createdDate]);

  useEffect(() => {
    const FormattedDate = getFomattedDate(new Date(createdDate));
    setFormattedDate(FormattedDate);
  }, [createdDate]);

  let positions: kakaoPlaces[] = places?.map((place) => ({
    placeId: place.placeId,
    name: place.name,
    mapX: place.mapX,
    mapY: place.mapY,
  }));

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      <div className={styles["course-id-container"]}>
        <div className={styles["title-container"]}>
          <h1 className={styles.title}>
            <div
              className={styles["title-length"]}
            >{`${places.length}코스`}</div>
            {title}
          </h1>
          <div className={styles["title-info"]}>
            <span className={styles.userinfo}>유저 정보</span>
            <span className={styles.dateinfo}>{formattedDate}</span>
          </div>
        </div>
        <div className={styles["title-nav"]}>
          {/* 왼쪽 좋아요 오른쪽  북마크, 약도, 공유 */}
          <div className={styles["title-nav-left"]}>
            <span className={styles.like}>
              <BsFillHeartFill />
              {likeCount}
            </span>
          </div>
          <div className={styles["title-nav-right"]}>
            <div className={`${styles["item-nav"]}`}>
              <BiMapAlt
                className={styles.roughmapIcon}
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
              />
              {/* {isRoughMapOpen && (
              <RoughMap
                RoughMapData={RoughMapData}
                setIsRoughMapOpen={setIsRoughMapOpen}
                isRoughMapOpen={isRoughMapOpen}
              />
            )} */}
            </div>
            <div className={styles["item-nav"]}>
              <BiBookmarkPlus />
            </div>
            <div className={`${styles["item-nav"]}`}>
              <BiShareAlt />
            </div>
          </div>
        </div>
        <div className={styles["content-container"]}>
          <p className={styles.content}>{content}</p>
          <div className={styles.map}>
            {positions && positions.length > 0 && (
              <KakaoMap positions={positions} />
            )}
            <div className={styles.info}>
              <ol className={styles["course-List"]}>
                {places.map((place, idx) => (
                  <li className={styles["course-item"]} key={place.placeId}>
                    <span className={styles.number}>{idx + 1}</span>
                    <Image
                      src={place.imgUrl}
                      alt={place.name}
                      width={126}
                      height={110}
                      priority
                    />
                    <div className={styles["item-content"]}>
                      <div className={styles["item-content-text"]}>
                        <span className={styles.name}>{place.name}</span>
                        <span className={styles.address}>
                          주소: {place.address}
                        </span>
                      </div>
                      <button className={styles.button} onClick={handleClick}>
                        자세히 보기
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
