package com.mohaeng.backend.course.dto.response;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.dto.CourseInPlaceDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CourseRes {
    private Long courseId;
    private String title;
    private String nickname;
    private Integer likeCount;
    private String courseDays;
    private String region;
    private Boolean isPublished;
    private LocalDateTime createdDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String content;
    private List<CourseInPlaceDto> places;

    @Builder
    private CourseRes(Long courseId, String title, String nickname, Integer likeCount, String courseDays, String region, Boolean isPublished, LocalDateTime createdDate, LocalDateTime startDate,
                      LocalDateTime endDate, String content, List<CourseInPlaceDto> places) {
        this.courseId = courseId;
        this.title = title;
        this.nickname = nickname;
        this.likeCount = likeCount;
        this.courseDays = courseDays;
        this.region = region;
        this.isPublished = isPublished;
        this.createdDate = createdDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.content = content;
        this.places = places;
    }

    public static CourseRes from(Course course, List<CourseInPlaceDto> courseInPlaceDtoList){
        return CourseRes.builder()
                .courseId(course.getId())
                .title(course.getTitle())
                .nickname(course.getMember().getNickName())
                .likeCount(course.getLikeCount())
                .courseDays(course.getCourseDays())
                .region(course.getRegion())
                .isPublished(course.getIsPublished())
                .createdDate(course.getCreatedDate())
                .startDate(course.getStartDate())
                .endDate(course.getEndDate())
                .content(course.getContent())
                .places(courseInPlaceDtoList)
                .build();
    }

}
