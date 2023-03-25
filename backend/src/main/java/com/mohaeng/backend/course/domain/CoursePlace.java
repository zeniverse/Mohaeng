package com.mohaeng.backend.course.domain;

import com.mohaeng.backend.place.domain.Place;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
public class CoursePlace {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_place_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    @Builder
    public CoursePlace(Course course, Place place) {
        this.course = course;
        this.place = place;
    }
}