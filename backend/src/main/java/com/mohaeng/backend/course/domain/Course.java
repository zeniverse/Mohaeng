package com.mohaeng.backend.course.domain;

import com.mohaeng.backend.common.BaseTimeEntity;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.member.domain.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Course extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long id;

    @OneToMany
    @JoinColumn(name = "course_id")
    private List<CoursePlace> coursePlaces = new ArrayList<>();

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

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

//    @Builder
//    public Course(List<CoursePlace> coursePlaces, Member member, String title, String nickname, LocalDateTime startDate, LocalDateTime endDate, LocalDateTime deletedDate,
//                  String content, Integer likeCount, Boolean isPublished, String imageName, String originName, String imageUrl) {
//        this.coursePlaces = coursePlaces;
//        this.member = member;
//        this.title = title;
//        this.nickname = nickname;
//        this.startDate = startDate;
//        this.endDate = endDate;
//        this.deletedDate = deletedDate;
//        this.content = content;
//        this.likeCount = likeCount;
//        this.isPublished = isPublished;
//        this.imageName = imageName;
//        this.originName = originName;
//        this.imageUrl = imageUrl;
//    }
}
