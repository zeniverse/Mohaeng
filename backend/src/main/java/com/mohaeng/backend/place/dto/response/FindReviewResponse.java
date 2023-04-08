package com.mohaeng.backend.place.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mohaeng.backend.place.domain.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class FindReviewResponse {
    private Long reviewId;
    private String nickname;
    private String content;
    private int likeCount;
    private String rating;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdDate;
    private List<String> imageUrls;

    public static FindReviewResponse of(Review review) {
        return new FindReviewResponse(
                review.getId(),
                review.getMember().getNickName(),
                review.getContent(),
                review.getLikeCount(),
                review.getRating(),
                review.getCreatedDate(),
                review.getReviewImageList().stream()
                        .map(i -> i.getImageUrl() + "/" + i.getImageName())
                        .collect(Collectors.toList())
        );
    }
}
