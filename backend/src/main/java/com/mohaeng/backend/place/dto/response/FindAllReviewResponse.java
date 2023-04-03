package com.mohaeng.backend.place.dto.response;

import com.mohaeng.backend.place.domain.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FindAllReviewResponse {
    private String memberName;
    private double rating;
    private int likeCount;
    private String content;
    private String imgUrl;

    public static FindAllReviewResponse of(Review review) {
        return new FindAllReviewResponse(
                review.getMember().getName(),
                review.getRating(),
                review.getLikeCount(),
                review.getContent(),
                review.getImgUrl());
    }
}
