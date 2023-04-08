package com.mohaeng.backend.place.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class PlaceDetailsDto {
    private Long placeId;
    private String name;
    private String areaCode;
    private String firstImage;
    private String contentId;
    private String mapX;
    private String mapY;
    private String overview;
}
