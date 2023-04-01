package com.mohaeng.backend.course.dto.response;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CourseLikesRes {

    private Long courseId;
    private Long totalLikes;

    public static CourseLikesRes from(Long courseId, Long totalLikes) {
        return new CourseLikesRes(courseId, totalLikes);
    }
}
