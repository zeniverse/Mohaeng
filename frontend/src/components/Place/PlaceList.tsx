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
  return (
    <ListContainer>
      {places?.map((place: content) => (
        <PlaceItem
          name={place.name}
          firstImage={place.firstImage}
          areaCode={place.areaCode}
          contentId={place.contentId}
        />
      ))}
    </ListContainer>
  );
};

export default PlaceList;
