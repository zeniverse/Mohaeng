package com.mohaeng.backend.place.dto;

import com.mohaeng.backend.place.domain.Place;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class FindAllPlacesDto {
    private Long placeId;
    private String name;
    private String areaCode;
    private String firstImage;
    private String contentId;
    private Boolean isBookmark;

    public static FindAllPlacesDto from(Place place, Boolean isBookmark){
        return new FindAllPlacesDto(place.getId(), place.getName(), place.getAreaCode(), place.getFirstImage(), place.getContentId(), isBookmark);
    }
}

