import { useDebounce } from "@/src/hooks/useDebounce";
import { useInfiniteScroll } from "@/src/hooks/useInfiniteScroll";
import axios from "axios";

import React, { useEffect, useState } from "react";
import styles from "./CoursePlaceInput.module.css";
import PlaceSelectList from "./PlaceSelectList";

export interface Places {
  placeId: number;
  imgUrl: string;
  address: string;
  name: string;
  rating: string;
}

export interface Images {
  href: string;
}

export async function fetchData(
  keyword: string
): Promise<{ places: Places[]; hasNext: boolean }> {
  try {
    const response = await axios.get<{
      data: { places: Places[]; hasNext: boolean };
    }>(`${process.env.NEXT_PUBLIC_API_URL}/api/course/placeSearch?size=${10}`, {
      params: { keyword },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}

const CoursePlaceInput = () => {
  const [places, setPlaces] = useState<Places[]>([]);
  const [search, setSearch] = useState<string | null>(""); //<string | null>
  const [hasNext, setHasNext] = useState(false);

  const ChangePlaceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = useDebounce(search, 500);

  const {
    isLoading,
    loadMoreCallback,
    hasDynamicPosts,
    dynamicPosts,
    isLastPage,
  } = useInfiniteScroll(places, hasNext, debouncedSearch);

  useEffect(() => {
    let isMounted = true;

    const fetchDataAsync = async (searchKeyword: string) => {
      try {
        const placeSearchResult = await fetchData(searchKeyword);
        if (isMounted) {
          setPlaces(placeSearchResult.places);
          setHasNext(placeSearchResult.hasNext);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        // 오류를 처리하는 로직 추가
      }
    };

    let timeout: NodeJS.Timeout;

    if (debouncedSearch) {
      timeout = setTimeout(() => {
        fetchDataAsync(debouncedSearch);
      }, 300);
    } else {
      if (isMounted) {
        setPlaces([]);
        setHasNext(false);
      }
    }

    return () => {
      clearTimeout(timeout);
      isMounted = false;
    };
  }, [debouncedSearch]);
  return (
    <div className={styles["place-search-container"]}>
      <label className={styles["input"]}>
        <span>코스에 넣을 장소를 추가해주세요!</span>
        <input
          className={styles.input}
          type="search"
          name="title"
          onChange={ChangePlaceHandler}
          placeholder={"검색할 장소를 입력해주세요"}
        />
      </label>
      {places.length > 0 && (
        <>
          <PlaceSelectList
            places={hasDynamicPosts ? dynamicPosts : places}
            isLoading={isLoading}
            loadMoreCallback={loadMoreCallback}
            isLastPage={isLastPage}
          />
        </>
      )}
    </div>
  );
};

export default CoursePlaceInput;
