import { useDebounce } from "@/src/hooks/useDebounce";

import { useEffect, useState } from "react";
import styles from "./CoursePlaceInput.module.css";
import PlaceSearchList from "./PlaceSearchList";

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

const CoursePlaceInput = () => {
  const [places, setPlaces] = useState<Places[]>([]);
  const [search, setSearch] = useState<string | null>(""); //<string | null>
  const [isLoading, setIsLoading] = useState(false);

  const ChangePlaceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setSearch(value);
  };

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setPlaces([]);
      try {
        const placeSearchRes = await fetch(
          `http://localhost:8080/api/course/placeSearch?keyword=${debouncedSearch}`
        );
        const placeSearchResult = await placeSearchRes.json();
        setPlaces(placeSearchResult.data.places);
      } catch (error) {
        console.error("Error fetching places:", error);
        setPlaces([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (debouncedSearch) {
      fetchData();
    }
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
      {/* TODO: 컨트리가 없고, 키워드가 있으면 로딩 상태이고 */}
      {/* TODO: 컨트리가 있고, 키워드가 있으면 컨트리 리스트를 보여준다. ㅇㅋ? */}
      <PlaceSearchList
        places={places}
        isLoading={isLoading}
        debouncedSearch={debouncedSearch}
      />
    </div>
  );
};

export default CoursePlaceInput;
