package com.mohaeng.backend.place.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
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
}
