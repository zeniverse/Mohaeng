package com.mohaeng.backend.course.dto;

import com.mohaeng.backend.course.domain.Course;
import lombok.*;

import java.util.stream.Collectors;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MainCourseListDto {
    private Long id;
    private String title;
    private String content;
    private String thumbnailUrl;
    private int likeCount;
    private Boolean isLiked;
    private Boolean isBookmarked;

    @Builder
    private MainCourseListDto(Long id, String title, String content, String thumbnailUrl, int likeCount, Boolean isLiked, Boolean isBookmarked) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.thumbnailUrl = thumbnailUrl;
        this.likeCount = likeCount;
        this.isLiked = isLiked;
        this.isBookmarked = isBookmarked;
    }

    public static MainCourseListDto from(Course course, Boolean isLiked, Boolean isBookmarked){
        return MainCourseListDto.builder()
                .id(course.getId())
                .title(course.getTitle())
                .content(course.getContent())
                .likeCount(course.getLikeCount())
                .thumbnailUrl(course.getThumbnailUrl())
                .isLiked(isLiked)
                .isBookmarked(isBookmarked)
                .build();
    }
}
