package com.mohaeng.backend.place.dto;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.service.PlaceService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@Builder
@AllArgsConstructor
public class MainPageDto {
    private Long placeId;
    private String name;
    private String content;
    private String contentId;
    private String averageRating;
    private String firstImage;

    public static MainPageDto Of(Place place, PlaceService placeService, Map<String, String> overviews){
        String firstImage = place.getFirstImage();
        if (firstImage == null || firstImage.isEmpty()) {
            firstImage = placeService.getFirstImage();
        }
        double averageRating = placeService.getAverageRatingForPlace(place.getId());
        List<String> overviewList = placeService.getPlaceOverview(place.getContentId());
        String overview = String.join(" ", overviewList);

        return MainPageDto.builder()
                .placeId(place.getId())
                .name(place.getName())
                .content(overview)
                .contentId(place.getContentId())
                .averageRating(String.valueOf(averageRating))
                .firstImage(firstImage)
                .build();
    }
}
