package com.mohaeng.backend.place.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class PlaceSearchDto {
    private String name;
    private String contentId;
}
