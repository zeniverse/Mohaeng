package com.mohaeng.backend.place.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlaceRatingDto {
    private double averageRating;
    private long reviewTotalElements;
}
