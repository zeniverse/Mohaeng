package com.mohaeng.backend.course.repository;

import com.mohaeng.backend.course.domain.CoursePlace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoursePlaceRepository extends JpaRepository<CoursePlace, Long> {
}

