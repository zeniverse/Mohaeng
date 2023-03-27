package com.mohaeng.backend.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MyPageCourseBookMarkDto {
    private Long bookMarkId;
    private Long courseId;
    private String courseTitle;
    private String region;
    private String content;
    private boolean isPublished;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    //private String courseImgUrl;
}
