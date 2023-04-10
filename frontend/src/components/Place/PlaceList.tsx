import styles from "./PlaceList.module.css";

import React, { useEffect, useState } from "react";
import { Place } from "@/src/interfaces/Place";
import PlaceItem from "./PlaceItem";
import PlaceFilter from "./PlaceFilter";
import axios from "axios";
import { placeState, content } from "@/src/store/reducers/PlaceSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import ListContainer from "../UI/ListContainer";

const PlaceList = () => {
  const places = useSelector((state: RootState) => state.place.contents);
  const { areaCode } = useSelector((state: RootState) => state.filter.area);
  return (
    <ListContainer>
      {places?.map((place: content) => (
        <PlaceItem
          name={place.name}
          firstImage={place.firstImage}
          contentId={place.contentId}
          isBookmarked={place.isBookmarked}
          placeId={place.placeId}
          areaCode={areaCode}
          rating={place.rating}
          review={place.review}
        />
      ))}
    </ListContainer>
  );
};

export default PlaceList;
