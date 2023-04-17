package com.mohaeng.backend.course.dto;

import com.mohaeng.backend.course.domain.Course;
import lombok.*;

import java.util.stream.Collectors;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MainCourseListDto {
    private Long courseId;
    private String title;
    private String content;
    private String thumbnailUrl;
    private int likeCount;
    private Boolean isBookmarked;
    private Boolean isLiked;

    @Builder
    public MainCourseListDto(Long courseId, String title, String content, String thumbnailUrl, int likeCount, Boolean isBookmarked, Boolean isLiked) {
        this.courseId = courseId;
        this.title = title;
        this.content = content;
        this.thumbnailUrl = thumbnailUrl;
        this.likeCount = likeCount;
        this.isBookmarked = isBookmarked;
        this.isLiked = isLiked;
    }

    public static MainCourseListDto from(Course course, Boolean isLiked, Boolean isBookmarked){
        return MainCourseListDto.builder()
                .courseId(course.getId())
                .title(course.getTitle())
                .content(course.getContent())
                .likeCount(course.getLikeCount())
                .thumbnailUrl(course.getThumbnailUrl())
                .isLiked(isLiked)
                .isBookmarked(isBookmarked)
                .build();
    }
}
