package com.mohaeng.backend.course.repository;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.domain.CourseBookmark;
import com.mohaeng.backend.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseBookmarkRepository extends JpaRepository<CourseBookmark, Long> {
    boolean existsCourseBookmarkByMemberAndCourse(Member member, Course course);
    CourseBookmark findByMemberAndCourse(Member member, Course course);
}
