import styles from "./SearchList.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { Keyword } from "@/src/interfaces/Keyword";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import SearchItem from "./SearchItem";
import Pagebar from "../Pagenation/Pagebar";
import { setSearchPlace } from "@/src/store/reducers/SearchPlaceSlice";

export default function SearchPlace(): JSX.Element {
  const [searchResult, setSearchResult] = useState<Keyword[]>([]);
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.page.page);
  const totalPages: number = useSelector(
    (state: RootState) => state.searchPlace.totalPages
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
          console.log(res.data);
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
            searchResult?.map((place) => (
              // <PlaceItem
              //   key={place.contentId}
              //   name={place.name}
              //   firstImage={place.firstImage}
              //   areaCode={place.areaCode}
              //   contentId={place.contentId}
              // />
              <SearchItem
                key={place.contentId}
                name={place.name}
                firstImage={place.firstImage}
                contentId={place.contentId}
                rating={0}
                review={place.review}
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
