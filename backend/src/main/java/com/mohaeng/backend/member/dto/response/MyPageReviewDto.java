package com.mohaeng.backend.member.dto.response;

import com.mohaeng.backend.place.domain.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MyPageReviewDto {
    private long reviewId;
    private String title;
    private String content;
    private int likeCount;
    private String rating;
    private String imgUrl;
    private LocalDateTime createdDate;

    public static MyPageReviewDto of(Review review) {
        return new MyPageReviewDto(
                review.getId(),
                review.getTitle(),
                review.getContent(),
                review.getLikeCount(),
                review.getRating(),
                review.getPlace().getFirstImage(),
                review.getCreatedDate()
        );
    }
}
