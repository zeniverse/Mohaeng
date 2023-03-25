package com.mohaeng.backend.course.repository;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.dto.CourseSearchDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CourseRepositoryCustom {
    Page<Course> findAllCourseWithKeyword(CourseSearchDto courseSearchDto, Pageable pageable);
}
