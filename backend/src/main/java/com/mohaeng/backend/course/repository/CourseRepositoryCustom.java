package com.mohaeng.backend.course.repository;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.dto.CourseListDto;
import com.mohaeng.backend.course.dto.CourseSearchDto;
import com.mohaeng.backend.course.dto.MainCourseListDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CourseRepositoryCustom {
    Page<CourseListDto> findAllCourseWithBookmarkAndLikes(CourseSearchDto courseSearchDto, Pageable pageable, Long memberId);
    List<MainCourseListDto> findTop10Course(Long memberId);
}
