import { RootState } from "@/src/store/store";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagebar from "../Pagenation/Pagebar";
import SearchItem from "./SearchItem";
import styles from "./SearchList.module.css";

interface Course {
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
  const [searchResult, setSearchResult] = useState([]);
  const totalPages: number = useSelector(
    (state: RootState) => state.search.totalPages
  );

  useEffect(() => {
    const fetchKeyword = async () => {
      try {
        const res = await axios.get(`/api/course`, {
          params: {
            keyword: keyword,
            // page: page,
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
            searchResult?.map((keyword) => (
              <SearchItem
                key={keyword.id}
                name={keyword.title}
                firstImage={keyword.thumbnailUrl}
                contentId={keyword.id}
              />
            ))
          ) : (
            <div className={styles.div}>
              코스 검색 결과 페이지입니다.
              <p className={styles.noResult}></p>
            </div>
          )}
        </ul>
        {/* <Pagebar totalPage={totalPages} /> */}
      </section>
    </>
  );
}
