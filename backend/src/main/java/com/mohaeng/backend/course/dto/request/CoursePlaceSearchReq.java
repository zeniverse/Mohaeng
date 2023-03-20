package com.mohaeng.backend.course.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class CoursePlaceSearchReq {
    private String keyword;
    private Long lastPlaceId;
    private String lastRating;

    public Double parseRatingToDouble(String lastRating) {
        return lastRating == null || lastRating.isEmpty() ? 0.0 : Double.parseDouble(lastRating);
    }
}
