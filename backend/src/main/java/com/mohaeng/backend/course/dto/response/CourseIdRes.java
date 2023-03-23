package com.mohaeng.backend.course.dto.response;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CourseIdRes {

    private Long courseId;

    public static CourseIdRes from(Long returnId) {
        return new CourseIdRes(returnId);
    }
}
