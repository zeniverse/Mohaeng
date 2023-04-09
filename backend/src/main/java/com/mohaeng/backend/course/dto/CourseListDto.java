package com.mohaeng.backend.course.dto;

import com.mohaeng.backend.course.domain.Course;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CourseListDto {
    private Long id;
    private String title;
    private String content;
    private String courseDays;
    private Integer likeCount;
    private String thumbnailUrl;
    private Boolean isLiked;
    private Boolean isBookmarked;
    private List<CourseListPlaceDto> places;

    @Builder
    private CourseListDto(Long id, String title, String content, String courseDays,
                          Integer likeCount, String thumbnailUrl, Boolean isLiked, Boolean isBookmarked, List<CourseListPlaceDto> places) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.courseDays = courseDays;
        this.likeCount = likeCount;
        this.thumbnailUrl = thumbnailUrl;
        this.isLiked = isLiked;
        this.isBookmarked = isBookmarked;
        this.places = places;
    }

    public static CourseListDto from(Course course, Boolean isLiked, Boolean isBookMarked){
        return CourseListDto.builder()
                .id(course.getId())
                .title(course.getTitle())
                .content(course.getContent())
                .courseDays(course.getCourseDays())
                .likeCount(course.getLikeCount())
                .thumbnailUrl(course.getThumbnailUrl())
                .isLiked(isLiked)
                .isBookmarked(isBookMarked)
                .places(course.getCoursePlaces().stream()
                        .map(coursePlace -> CourseListPlaceDto.builder()
                                .name(coursePlace.getPlace().getName())
                                .build()).collect(Collectors.toList()))
                .build();

    }
}
