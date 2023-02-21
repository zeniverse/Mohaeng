package com.mohaeng.backend.course.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Course extends BaseTimeEntity{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long id;

//    @OneToMany
//    @JoinColumn(name = "course_id")
//    private List<CoursePlace> coursePlaces = new ArrayList<>();

    @Column(nullable = false)
    private String title;

    private String nickname;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime deletedDate;

    private String content;
    private Integer likeCount;
    private Boolean isPublished;

    private String imageName;
    private String originName;
    private String imageUrl;

}
