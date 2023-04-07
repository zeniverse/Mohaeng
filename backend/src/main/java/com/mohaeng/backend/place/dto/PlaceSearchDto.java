package com.mohaeng.backend.place.dto;

import com.mohaeng.backend.place.domain.Place;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class PlaceSearchDto {
    private String name;
    private String contentId;
    private String firstImage;
    private Boolean isBookmark;

    public static PlaceSearchDto from(Place place, Boolean isBookmark){
        return new PlaceSearchDto(place.getName(),
                place.getContentId(), place.getFirstImage(),isBookmark );
    }
}
