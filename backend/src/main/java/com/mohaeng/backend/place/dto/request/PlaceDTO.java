package com.mohaeng.backend.place.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PlaceDTO {
    private String name;
    private String addr1;
    private String areaCode;
    private String sigunguCode;
    private String firstIimage;
    private String firstImage2;
    private String mapX;
    private String mapY;
    private String contentId;
}
