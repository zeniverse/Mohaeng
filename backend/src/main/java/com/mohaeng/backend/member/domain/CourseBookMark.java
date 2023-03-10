package com.mohaeng.backend.member.domain;

import com.mohaeng.backend.course.domain.Course;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class CourseBookMark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
}
