import { useDebounce } from "@/src/hooks/useDebounce";
import { useInfiniteScroll } from "@/src/hooks/useInfiniteScroll";
import { IPlacesSearch } from "@/src/interfaces/Course.type";
import axios from "axios";

import React, { useEffect, useState } from "react";
import styles from "./CoursePlaceInput.module.css";
import PlaceSelectList from "./PlaceSelectList";

export interface Images {
  href: string;
}

// export async function fetchData(
//   keyword: string
// ): Promise<{ places: Places[]; hasNext: boolean }> {
//   try {
//     const response = await axios.get<{
//       data: { places: Places[]; hasNext: boolean };
//     }>(`${process.env.NEXT_PUBLIC_API_URL}/api/course/placeSearch`, {
//       params: { keyword },
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching places:", error);
//     throw error;
//   }
// }

const CoursePlaceInput = () => {
  const [places, setPlaces] = useState<IPlacesSearch[]>([]);
  const [search, setSearch] = useState<string | null>(""); //<string | null>
  const [hasNext, setHasNext] = useState(false);

  const ChangePlaceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    async function fetchData() {
      setPlaces([]);
      try {
        const placeSearchRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/course/placeSearch`,
          { params: { keyword: debouncedSearch } }
        );
        const placeSearchResult = placeSearchRes.data;
        setPlaces(placeSearchResult.data.places);
        setHasNext(placeSearchResult.data.hasNext);
      } catch (error) {
        console.error("Error fetching places:", error);
        setPlaces([]);
      } finally {
      }
    }

    if (debouncedSearch) {
      fetchData();
    }
  }, [debouncedSearch]);

  const {
    isLoading,
    loadMoreCallback,
    isInfiniteScrolling,
    dynamicPosts,
    isLastPage,
  } = useInfiniteScroll(places, hasNext, debouncedSearch);

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
            places={isInfiniteScrolling ? dynamicPosts : places}
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
