package com.mohaeng.backend.course.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CourseInPlaceDto {
    private Long placeId;
    private String name;
    private String imgUrl;
    private String address;
    private String mapX;
    private String mapY;

    @Builder
    public CourseInPlaceDto(Long placeId, String name, String imgUrl, String address,
                            String mapX, String mapY) {
        this.placeId = placeId;
        this.name = name;
        this.imgUrl = imgUrl;
        this.address = address;
        this.mapX = mapX;
        this.mapY = mapY;
    }
}
