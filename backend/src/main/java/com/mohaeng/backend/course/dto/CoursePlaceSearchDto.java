package com.mohaeng.backend.course.dto;

import com.mohaeng.backend.place.domain.Place;
import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CoursePlaceSearchDto {

    private Long placeId;
    private String imgUrl;
    private String name;
    private String address;
    private double rating;

    @Builder
    private CoursePlaceSearchDto(Long placeId, String imgUrl, String name, String address, double rating) {
        this.placeId = placeId;
        this.imgUrl = imgUrl;
        this.name = name;
        this.address = address;
        this.rating = rating;
    }

    public static CoursePlaceSearchDto from(Place place){
        return CoursePlaceSearchDto.builder()
                .placeId(place.getId())
                .imgUrl(place.getFirstImage())
                .name(place.getName())
                .address(place.getAddress())
                .rating(place.getRating())
                .build();
    }
}
