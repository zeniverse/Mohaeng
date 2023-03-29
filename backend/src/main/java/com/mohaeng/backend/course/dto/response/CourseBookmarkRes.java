package com.mohaeng.backend.course.dto.response;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CourseBookmarkRes {

    private Long courseId;
    private Long memberId;

    public static CourseBookmarkRes from(Long courseId, Long memberId) {
        return new CourseBookmarkRes(courseId, memberId);
    }
}
