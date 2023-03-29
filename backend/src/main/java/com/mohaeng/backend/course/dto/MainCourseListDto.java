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
    private boolean isLike;
    private boolean isBookmark;

    @Builder
    private MainCourseListDto(Long id, String title, String content, String thumbnailUrl, int likeCount, boolean isLike, boolean isBookmark) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.thumbnailUrl = thumbnailUrl;
        this.likeCount = likeCount;
        this.isLike = isLike;
        this.isBookmark = isBookmark;
    }

    public static MainCourseListDto from(Course course, boolean isLike, boolean isBookmark){
        return MainCourseListDto.builder()
                .id(course.getId())
                .title(course.getTitle())
                .content(course.getContent())
                .likeCount(course.getLikeCount())
                .thumbnailUrl(course.getThumbnailUrl())
                .isLike(isLike)
                .isBookmark(isBookmark)
                .build();
    }
}
