package com.mohaeng.backend.course.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@ToString
public class CoursePlaceSearchDto {

    private Long placeId;
    private String imgUrl;
    private String name;
    private String address;
    private double rating;

}
