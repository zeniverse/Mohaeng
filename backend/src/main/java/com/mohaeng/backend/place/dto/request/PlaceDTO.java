package com.mohaeng.backend.place.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PlaceDTO {
    private String name;
    private String addr1;
    private String areacode;
    private String sigungucode;
    private String firstimage;
    private String firstimage2;
    private String mapx;
    private String mapy;
    private String contentid;
}
