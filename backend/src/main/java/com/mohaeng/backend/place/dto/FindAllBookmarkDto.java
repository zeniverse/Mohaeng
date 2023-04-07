package com.mohaeng.backend.place.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class FindAllBookmarkDto {

    private String name;
    private String firstImage;
}
