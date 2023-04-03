import styles from "./PlaceSearchList.module.css";
import Image from "next/image";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import { EventHandler, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useReduxHooks";
import { addPlaceObject } from "@/src/store/reducers/CourseFormSlice";

const PlaceSearchList = ({ places, isLoading, debouncedSearch }: any) => {
  const [items, setItems] = useState([...places]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(0);

  const dispatch = useAppDispatch();
  const { course } = useAppSelector((state) => state.courseForm);
  const {
    title,
    startDate,
    endDate,
    isPublished,
    courseDays,
    region,
    content,
  } = course;

  const listRef = useRef<HTMLDivElement>(null)!;

  useEffect(() => {
    setItems([...places]);
  }, [places]);

  useEffect(() => {
    function handleScroll() {
      if (listRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        // console.log(
        //   `scrollTop: ${Math.floor(
        //     scrollTop
        //   )}, scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`
        // );
        if (
          Math.floor(scrollHeight) - scrollTop <= clientHeight &&
          hasNext &&
          !loading
        ) {
          setLoading(true);
          setPage((prevPage) => prevPage + 1);
        }
      }
    }

    if (listRef.current) {
      listRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasNext, loading]);

  useEffect(() => {
    if (page === 0) return;
    const lastItemIndex = items?.length - 1;
    const lastid = items[lastItemIndex]?.placeId;
    const lastRating = items[lastItemIndex]?.rating;
    console.log(page);
    console.log("lastItemindex" + lastItemIndex);
    async function fetchItems() {
      try {
        const placeSearchRes = await fetch(
          `http://localhost:8080/api/course/placeSearch?keyword=${debouncedSearch}&lastId=${lastid}&lastRating=${lastRating}`
        );
        if (!placeSearchRes.ok) return;
        const placeSearchResult = await placeSearchRes.json();
        console.log(placeSearchResult);
        setItems((prevItems) => [
          ...prevItems,
          ...placeSearchResult?.data.places,
        ]);
        setHasNext(placeSearchResult.data.hasNext);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchItems();
  }, [page]);

  const itemClickHandler = (place: any) => {
    dispatch(addPlaceObject(place));
    console.log(place);
  };

  return (
    <div className={styles["search-list"]} ref={listRef}>
      {isLoading && <p>Loading...</p>}
      {items.map((place: any) => {
        return (
          <div
            key={place.placeId}
            className={styles["search-item"]}
            onClick={() => itemClickHandler(place)}
          >
            {place?.imgUrl && (
              <Image
                src={place.imgUrl}
                width={100}
                height={90}
                alt={place.name}
                className={styles["place-image"]}
              />
            )}
            <div className={styles.notice_body}>
              <p>{place.name}</p>

              <FiveStarRating rating={place.rating} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlaceSearchList;
