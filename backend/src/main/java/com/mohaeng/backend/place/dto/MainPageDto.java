package com.mohaeng.backend.place.dto;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.domain.Review;
import com.mohaeng.backend.place.service.PlaceService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MainPageDto {
    private Long placeId;
    private String name;
    private String content;
    private String averageRating;
    private String firstImage;

    public static MainPageDto Of(Place place, Review review, PlaceService placeService){
        String firstImage = place.getFirstImage();
        if (firstImage == null || firstImage.isEmpty()) {
            firstImage = placeService.getFirstImage();
        }
        double averageRating = placeService.getAverageRatingForPlace(place.getId());

        return MainPageDto.builder()
                .placeId(place.getId())
                .name(place.getName())
                .content(review.getContent())
                .averageRating(String.valueOf(averageRating))
                .firstImage(firstImage)
                .build();

    }
}
