package com.mohaeng.backend.place.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.mohaeng.backend.common.BaseTimeEntity;
import com.mohaeng.backend.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class Review extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PLACE_ID")
    private Place place;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    private String nickname;
    private String title;
    private String content;
    private int likeCount;
    private String rating;
    private int totalPages;
    private long totalElements;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdDate;

    @OneToMany(mappedBy = "review")
    private List<ReviewImage> reviewImageList = new ArrayList<>();

    public void addReviewImage(ReviewImage reviewImage) {
        this.reviewImageList.add(reviewImage);
    }

    public void update(String title, String content, String rating) {
        this.title = title;
        this.content = content;
        this.rating = rating;
    }

}
