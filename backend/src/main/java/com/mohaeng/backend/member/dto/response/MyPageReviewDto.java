package com.mohaeng.backend.member.dto.response;

import com.mohaeng.backend.place.domain.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MyPageReviewDto {
    private long reviewId;
    private long placeId;
    private String name;
    private String content;
    private String rating;
    private String imgUrl;
    private LocalDateTime createdDate;

    public static MyPageReviewDto of(Review review) {
        String imgUrl="";
        if (review.getReviewImageList().size() != 0) {
            String url = review.getReviewImageList().get(0).getImageUrl();
            String name = review.getReviewImageList().get(0).getImageName();
            imgUrl = url + "/" + name;
        } else {
            imgUrl = review.getPlace().getFirstImage();
        }

        return new MyPageReviewDto(
                review.getId(),
                review.getPlace().getId(),
                review.getPlace().getName(),
                review.getContent(),
                review.getRating(),
                imgUrl,
                review.getCreatedDate()
        );
    }
}
