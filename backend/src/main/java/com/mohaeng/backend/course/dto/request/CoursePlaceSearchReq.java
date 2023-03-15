package com.mohaeng.backend.course.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CoursePlaceSearchReq {
    private String keyword;
    private Long lastPlaceId;
    private String lastRating;

    public Double parseRatingToDouble(String lastRating) {
        return lastRating == null || lastRating.isEmpty() ? 0.0 : Double.parseDouble(lastRating);
    }
}
