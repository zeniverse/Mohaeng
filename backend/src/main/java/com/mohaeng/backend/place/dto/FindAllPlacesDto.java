package com.mohaeng.backend.place.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class FindAllPlacesDto {
    private String name;
    private String areaCode;
    private String firstImage;
    private String contentId;

}

