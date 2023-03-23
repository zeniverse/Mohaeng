package com.mohaeng.backend.course.dto.response;

import com.mohaeng.backend.course.dto.CourseListDto;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CourseListRes {
    private List<CourseListDto> courseList = new ArrayList<>();
    private Long totalElements;
    private Integer totalPages;

    @Builder
    private CourseListRes(List<CourseListDto> courseList, Long totalElements, Integer totalPages) {
        this.courseList = courseList;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public static CourseListRes from(List<CourseListDto> courseList, Long totalElements, Integer totalPages) {
        return CourseListRes.builder()
                .courseList(courseList)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .build();
    }
}
