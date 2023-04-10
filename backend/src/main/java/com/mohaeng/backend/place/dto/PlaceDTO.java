package com.mohaeng.backend.place.dto;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.service.PlaceService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class PlaceDTO {
    private String name;
    private String address;
    private String areaCode;
    private String sigunguCode;
    private String firstImage;
    private String firstImage2;
    private String mapX;
    private String mapY;
    private String contentId;

    public static PlaceDTO from(Place place, PlaceService placeService){
        String firstImage = place.getFirstImage();
        if (firstImage == null || firstImage.isEmpty()) {
            firstImage = placeService.getFirstImage();
        }
        return PlaceDTO.builder()
                .name(place.getName())
                .address(place.getAddress())
                .areaCode(place.getAreaCode())
                .sigunguCode(place.getSigunguCode())
                .firstImage(firstImage)
                .firstImage2(place.getFirstImage2())
                .mapX(place.getMapX())
                .mapY(place.getMapY())
                .contentId(place.getContentId())
                .build();
    }
}
