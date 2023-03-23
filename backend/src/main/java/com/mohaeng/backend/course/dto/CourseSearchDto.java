package com.mohaeng.backend.course.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@Builder
@ToString
public class CourseSearchDto {
    private String keyword;
    private String region;
    private String days;
    private String sort;
}
