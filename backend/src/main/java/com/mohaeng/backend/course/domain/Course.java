package com.mohaeng.backend.course.domain;

import com.mohaeng.backend.common.BaseTimeEntity;
import com.mohaeng.backend.course.dto.request.CourseReq;
import com.mohaeng.backend.course.dto.request.CourseUpdateReq;
import com.mohaeng.backend.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Where(clause = "deleted_date is NULL")
public class Course extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long id;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<CoursePlace> coursePlaces = new ArrayList<>();

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    private String title;

    private String nickname;
    private String region;
    private String courseDays;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime deletedDate;

    private String content;
    private Integer likeCount;
    private Boolean isPublished;
    private String thumbnailUrl;

    @Builder
    public Course(List<CoursePlace> coursePlaces, Member member, String title, String nickname, String region, String courseDays, LocalDateTime startDate, LocalDateTime endDate,
                  LocalDateTime deletedDate, String content, Integer likeCount, Boolean isPublished, String thumbnailUrl) {
        this.coursePlaces = coursePlaces;
        this.member = member;
        this.title = title;
        this.nickname = nickname;
        this.region = region;
        this.courseDays = courseDays;
        this.startDate = startDate;
        this.endDate = endDate;
        this.deletedDate = deletedDate;
        this.content = content;
        this.likeCount = likeCount;
        this.isPublished = isPublished;
        this.thumbnailUrl = thumbnailUrl;
    }

    public void addCoursePlaces(List<CoursePlace> data){
        this.coursePlaces = data;
    }

    public void updateCourse(CourseUpdateReq courseUpdateReq, LocalDateTime start, LocalDateTime end) {
        this.title = courseUpdateReq.getTitle();
        this.startDate = start;
        this.endDate = end;
        this.isPublished = courseUpdateReq.getIsPublished();
        this.courseDays = courseUpdateReq.getCourseDays();
        this.region = courseUpdateReq.getRegion();
        this.thumbnailUrl = courseUpdateReq.getThumbnailUrl();
        this.content = courseUpdateReq.getContent();
    }

    public void updateDeletedDate(List<CoursePlace> coursePlaces){
        this.deletedDate = LocalDateTime.now();
        for (CoursePlace coursePlace : coursePlaces) {
            coursePlace.updateDeletedDate();
        }
    }

    public void addLikeCount(){
        this.likeCount += 1;
    }

    public void cancelLikeCount(){
        this.likeCount -= 1;
    }

}