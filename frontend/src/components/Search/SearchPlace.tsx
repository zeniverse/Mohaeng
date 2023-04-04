import styles from "./SearchList.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Keyword } from "@/src/interfaces/Keyword";
import axios from "axios";
import SearchItem from "./SearchItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { setSearchPlace } from "@/src/store/reducers/searchSlice";
import Pagebar from "../Pagenation/Pagebar";

// ToDo: 띄어쓰기, 단어 조합 검색에 대해서 좀 더 리팩토링 필요
// 결과를 로드하는 동안 '검색결과가 없습니다'가 마운트되는 이슈

export default function SearchPlace(): JSX.Element {
  const [searchResult, setSearchResult] = useState<Keyword[]>([]);
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.page.page);
  const totalPages: number = useSelector(
    (state: RootState) => state.search.totalPages
  );

  useEffect(() => {
    const fetchKeyword = async () => {
      try {
        const res = await axios.get(`/api/place`, {
          params: {
            keyword: keyword,
            page: page,
          },
          withCredentials: true,
        });
        if (res.data.data.content !== []) {
          dispatch(setSearchPlace(res.data.data));
          const { content } = res.data.data;
          setSearchResult(content);
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
  }, [keyword, page]);

  return (
    <>
      <section className={styles.section}>
        <h3 className={styles.h2}>검색하신 결과: {keyword} </h3>
        <ul className={styles.keywordList}>
          {searchResult.length > 0 ? (
            searchResult?.map((keyword) => (
              <SearchItem
                key={keyword.contentId}
                name={keyword.name}
                firstImage={keyword.firstImage}
                contentId={keyword.contentId}
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
