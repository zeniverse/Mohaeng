package com.mohaeng.backend.place.dto.response;

import com.mohaeng.backend.place.domain.Review;
import com.mohaeng.backend.place.domain.ReviewImage;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public class FindAllReviewResponse {
    private String memberName;
    private String memberImage;
    private double rating;
    private int likeCount;
    private String content;
    private List<String> imgUrl = new ArrayList<>();

    public static FindAllReviewResponse of(Review review) {
        return new FindAllReviewResponse(
                review.getMember().getName(),
                review.getMember().getImageURL() + "/" + review.getMember().getImageName(),
                review.getRating(),
                review.getLikeCount(),
                review.getContent(),
                getAllImageName(review));
    }

    private static List<String> getAllImageName(Review review) {
        List<ReviewImage> list = review.getReviewImageList();
        List<String> imgUrl = new ArrayList<>();
        for (ReviewImage reviewImage : list) {
            imgUrl.add(reviewImage.getImageUrl() + "/" + reviewImage.getImageName());
        }
        return imgUrl;
    }
}
