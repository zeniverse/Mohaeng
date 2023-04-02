package com.mohaeng.backend.member.dto.response;

import com.mohaeng.backend.course.domain.CourseBookmark;
import com.mohaeng.backend.course.domain.CourseStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MyPageCourseBookMarkDto {
    private Long bookMarkId;
    private Long courseId;
    private String courseTitle;
    private String region;
    private String content;
    private CourseStatus courseStatus;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public static MyPageCourseBookMarkDto of(CourseBookmark courseBookmark) {
        return new MyPageCourseBookMarkDto(
                courseBookmark.getId(),
                courseBookmark.getCourse().getId(),
                courseBookmark.getCourse().getTitle(),
                courseBookmark.getCourse().getRegion(),
                courseBookmark.getCourse().getContent(),
                courseBookmark.getCourse().getCourseStatus(),
                courseBookmark.getCreatedDate(),
                courseBookmark.getModifiedDate());
    }
}
