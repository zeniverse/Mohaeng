import styles from "./PlaceList.module.css";

import React, { useEffect, useState } from "react";
import { Place } from "@/src/interfaces/Place";
import PlaceItem from "./PlaceItem";
import PlaceFilter from "./PlaceFilter";
import axios from "axios";
import { placeState, content } from "@/src/store/reducers/PlaceSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

const PlaceList = () => {
  const places = useSelector((state: RootState) => state.place.contents);
  return (
    <div className={styles["place-list-container"]}>
      {places?.map((place: content) => (
        <PlaceItem
          name={place.name}
          firstImage={place.firstImage}
          areaCode={place.areaCode}
          contentId={place.contentId}
          isBookmark={place.isBookmark}
        />
      ))}
    </div>
  );
};

export default PlaceList;
