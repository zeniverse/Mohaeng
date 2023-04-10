import styles from "./SearchList.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import cookie from "react-cookies";
import { Keyword } from "@/src/interfaces/Keyword";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import SearchItem from "./SearchItem";
import Pagebar from "../Pagenation/Pagebar";
import {
  getPlaceListAction,
  setSearchPlace,
} from "@/src/store/reducers/searchPlaceSlice";
import { setPage } from "@/src/store/reducers/pageSlice";
import ListContainer from "../UI/ListContainer";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
// import PlaceItem from "../Place/PlaceItem";

export default function SearchPlaceList(): JSX.Element {
  const { content, totalElements, totalPages } = useAppSelector(
    (state) => state.searchPlace
  );
  const { keyword } = useAppSelector((state) => state.filter);
  const [searchResult, setSearchResult] = useState<Keyword[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.page.page);

  const accessToken = cookie.load("accessToken");

  useEffect(() => {
    dispatch(setPage(page));
    dispatch(
      getPlaceListAction({
        ...(keyword ? { keyword } : {}),
        page,
      })
    );
  }, [dispatch, keyword, page]);

  return (
    <>
      <section className={styles.section}>
        <h3 className={styles.h3}>검색하신 결과: {keyword} </h3>
        <ul className={styles.keywordList}>
          {searchResult.length > 0 ? (
            <ListContainer>
              {searchResult?.map((place) => (
                <SearchItem
                  key={place.placeId}
                  name={place.name}
                  firstImage={place.firstImage}
                  contentId={place.contentId}
                  placeId={place.placeId}
                  isBookmarked={place.isBookmarked}
                  averageRating={place.averageRating}
                  reviewTotalElements={place.reviewTotalElements}
                />
              ))}
            </ListContainer>
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
