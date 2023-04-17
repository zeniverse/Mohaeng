package com.mohaeng.backend.place.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FindAllPlacesRequest {

    // 여행지 전체 조회용 Response
    private String keyword;
    private String name;
    private String areaCode;
    private String contentId;
    private double rating;

}
