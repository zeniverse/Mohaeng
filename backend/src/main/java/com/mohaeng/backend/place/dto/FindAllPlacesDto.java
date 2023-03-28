package com.mohaeng.backend.place.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.awt.print.Pageable;

@Getter
@Builder
public class FindAllPlacesDto {
    private String name;
    private String areaCode;
    private String firstImage;
    private String contentId;

    public FindAllPlacesDto(String name, String areaCode, String firstImage, String contentId) {
        this.name = name;
        this.areaCode = areaCode;
        this.firstImage = firstImage;
        this.contentId = contentId;
    }
}

