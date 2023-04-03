import { createSlice } from "@reduxjs/toolkit";

export interface content {
  name: string;
  areaCode: string;
  firstImage: string;
  contentId: string;
  mapX: string;
  mapY: string;
  overview: string;
}

interface PlaceInfo {
  name: string;
  areaCode: string;
  firstImage: string;
  contentId: string;
  mapX: string;
  mapY: string;
  overview: string;
}

export interface placeInfoState {
  contents: content[];
}

const initialState: placeInfoState = {
  contents: [],
};

export const placeDetailSlice = createSlice({
  name: "placeDetail",
  initialState,
  reducers: {
    setPlaceDetail: (state, action) => {
      state.contents = action.payload.content;
    },
  },
});

export const { setPlaceDetail } = placeDetailSlice.actions;
export default placeDetailSlice.reducer;
