package com.mohaeng.backend.course.dto;

import com.mohaeng.backend.course.domain.Course;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CourseListDto {
    private Long courseId;
    private String title;
    private String content;
    private String courseDays;
    private Integer likeCount;
    private String thumbnailUrl;
    private Boolean isBookmarked;
    private Boolean isLiked;
    private String places;

    @Builder
    public CourseListDto(Long courseId, String title, String content, String courseDays,
                          Integer likeCount, String thumbnailUrl, Boolean isBookmarked, Boolean isLiked, String places) {
        this.courseId = courseId;
        this.title = title;
        this.content = content;
        this.courseDays = courseDays;
        this.likeCount = likeCount;
        this.thumbnailUrl = thumbnailUrl;
        this.isBookmarked = isBookmarked;
        this.isLiked = isLiked;
        this.places = places;
    }
}
