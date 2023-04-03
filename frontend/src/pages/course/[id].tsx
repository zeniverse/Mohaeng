import { CourseDetailType, kakaoPlaces } from "@/src/interfaces/Course";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "./courseDetail.module.css";

import CourseDetailNav from "@/src/components/CourseDetail/CourseDetailNav";
import CourseDetailContent from "@/src/components/CourseDetail/CourseDetailContent";

const initialData = {
  courseId: 0,
  title: "",
  isPublished: true,
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
    ? parseInt(router.query.id[0], 10)
    : router.query.id !== undefined
    ? parseInt(router.query.id, 10)
    : NaN;

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
    courseId,
    title,
    likeCount,
    isPublished,
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

  useEffect(() => {
    const fetchCourseData = async (id: number) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/course/${id}`
      );
      const courseData = await response.json();
      setcourseDetail(courseData.data);
    };

    if (id) {
      fetchCourseData(id);
    }
  }, [id]);

  const getFomattedDate = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  }, []);

  useEffect(() => {
    const FormattedDate = getFomattedDate(new Date(createdDate));
    setFormattedDate(FormattedDate);
  }, [createdDate]);
  // useEffect(() => {
  //   const agoDate = timeAgoFn(new Date(createdDate));
  //   setTimeAgoDate(agoDate);
  // }, [createdDate]);

  // let mapData: kakaoPlaces[] = places?.map((place) => ({
  //   placeId: place.placeId,
  //   name: place.name,
  //   mapX: place.mapX,
  //   mapY: place.mapY,
  // }));

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
        <CourseDetailNav likeCount={likeCount} places={places} />
        <CourseDetailContent
          mapData={courseDetail.places}
          places={places}
          content={content}
          router={router}
        />
      </div>
    </>
  );
}
