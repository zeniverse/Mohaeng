import { RootState } from "@/src/store/store";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseItem from "../Course/CourseItem";
import Pagebar from "../Pagenation/Pagebar";
import styles from "./SearchList.module.css";

interface CourseList {
  id: number;
  title: string;
  content: string;
  courseDays: string;
  likeCount: number;
  thumbnailUrl: string;
  places: [];
  like: false;
  bookMark: true;
}

export default function SearchCourse(): JSX.Element {
  const router = useRouter();
  const { keyword } = router.query;
  const [searchResult, setSearchResult] = useState<CourseList[]>([]);
  const page = useSelector((state: RootState) => state.page.page);
  const totalPages: number = useSelector(
    (state: RootState) => state.search.totalPages
  );

  useEffect(() => {
    const fetchKeyword = async () => {
      try {
        const res = await axios.get(`/api/course`, {
          params: {
            keyword: keyword,
            page: page,
          },
          withCredentials: true,
        });
        if (res.data.data.content !== []) {
          console.log(res.data.data);
          const { courseList } = res.data.data;
          setSearchResult(courseList);
        } else {
          console.log(res.data.data.content);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    if (keyword) {
      fetchKeyword();
    }
  }, [keyword]);

  return (
    <>
      <section className={styles.section}>
        <h3 className={styles.h2}>검색하신 결과: {keyword} </h3>
        <ul className={styles.keywordList}>
          {searchResult.length > 0 ? (
            searchResult?.map((course) => (
              <CourseItem
                key={course.id}
                id={course.id}
                courseTitle={course.title}
                courseDesc={course.content}
                courseLike={course.likeCount}
                thumbnailUrl={course.thumbnailUrl}
                courseDays={course.courseDays}
                courseList={course.places}
              />
            ))
          ) : (
            <div className={styles.div}>
              <p className={styles.noResult}>
                해당하는 검색 결과가 없습니다. 😢
              </p>
            </div>
          )}
        </ul>
        <Pagebar totalPage={totalPages} />
      </section>
    </>
  );
}
