package com.mohaeng.backend.place.dto.response;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.dto.FindAllPlacesDto;
import lombok.*;

import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class FindAllPlacesResponse {

    private List<FindAllPlacesDto> filteredPlaces;
    // 여행지 전체 조회용 Response
    private Long id;
    private String name;
    private String areaCode;
    private String firstImage;
    private String contentId;
    private double rating;

    @Builder
    private FindAllPlacesResponse(Long id, String name, String areaCode, String firstImage, String contentId, double rating, List<FindAllPlacesDto> filteredPlaces) {
        this.id = id;
        this.name = name;
        this.areaCode = areaCode;
        this.firstImage = firstImage;
        this.contentId = contentId;
        this.rating = rating;
        this.filteredPlaces = filteredPlaces;
    }

    public FindAllPlacesResponse(List<FindAllPlacesDto> filteredPlaces) {
        this.filteredPlaces = filteredPlaces;
    }

    public static FindAllPlacesResponse from(Place place, List<FindAllPlacesResponse> findAllPlacesResponses){
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
