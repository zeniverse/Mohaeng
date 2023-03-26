package com.mohaeng.backend.course.repository;

import com.mohaeng.backend.course.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long>, CourseRepositoryCustom{
}
