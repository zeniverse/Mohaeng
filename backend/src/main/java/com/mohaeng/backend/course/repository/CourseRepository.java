package com.mohaeng.backend.course.repository;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.domain.CourseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long>, CourseRepositoryCustom{
    List<Course> findTop10ByCourseStatusOrderByLikeCountDesc(CourseStatus courseStatus);
}
