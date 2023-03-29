import styles from "./PlaceList.module.css";

import React, { useEffect, useState } from "react";
import { Place } from "@/src/interfaces/Place";
import PlaceItem from "./PlaceItem";
import PlaceFilter from "./PlaceFilter";

const PlaceList = () => {
  const [courseData, setCoueseData] = useState<Place[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/place");
      const data = await res.json();
      setCoueseData(data);
      // const courseRes = await fetch(
      //   ${process.env.NEXT_PUBLIC_BASE_URL}/api/place
      // );
      // const responseData = await courseRes.json();
      // const courseList = await responseData.data.courseList;
      // setCoueseData(courseList);
    }
    fetchData();
  }, []);
  return (
    <div className={styles["place-list-container"]}>

      {courseData?.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          placeTitle={place.title}
          placeImg={place.firstimage}
          placeRating={place.rating}
        />
      ))}
    </div>
  );
};

export default PlaceList;
