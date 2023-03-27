package com.mohaeng.backend.place.dto.response;

import com.mohaeng.backend.place.domain.Place;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FindAllPlacesResponse {

    // 여행지 전체 조회용 Response
    private Long id;
    private String name;
    private String areaCode;
    private String firstImage;
    private String contentId;
    private double rating;

    @Builder
    private FindAllPlacesResponse(Long id, String name, String areaCode, String firstImage, String contentId, double rating) {
        this.id = id;
        this.name = name;
        this.areaCode = areaCode;
        this.firstImage = firstImage;
        this.contentId = contentId;
        this.rating = rating;
    }

    public FindAllPlacesResponse(List<Place> filteredPlaces) {

    }

    public static FindAllPlacesResponse from(Place place){
        return FindAllPlacesResponse.builder()
                .id(place.getId())
                .name(place.getName())
                .areaCode(place.getAreaCode())
                .firstImage(place.getFirstImage())
                .contentId(place.getContentId())
                .rating(place.getRating())
                .build();
    }
}
