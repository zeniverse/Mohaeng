package com.mohaeng.backend.member.dto.response;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.domain.CoursePlace;
import com.mohaeng.backend.course.domain.CourseStatus;
import com.mohaeng.backend.place.domain.Place;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public class MyPageCourseDto {
    private long courseId;
    private String title;
    private String imgUrl;
    private int likeCount;
    private String content;
    private String courseDays;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdDate;
    private CourseStatus courseStatus;
    private List<MyPageCoursePlaceDto> data = new ArrayList<>();

    public static MyPageCourseDto of(Course course) {
        return new MyPageCourseDto(
                course.getId(),
                course.getTitle(),
                course.getThumbnailUrl(),
                course.getLikeCount(),
                course.getContent(),
                course.getCourseDays(),
                course.getStartDate(),
                course.getEndDate(),
                course.getCreatedDate(),
                course.getCourseStatus(),
                MyPageCoursePlaceDto.of(course.getCoursePlaces())
        );
    }

    @Getter
    @AllArgsConstructor
    static class MyPageCoursePlaceDto {
        private long placeId;
        private String imagUrl;
        private String title;
        private String address;
        private String content;
        private double rating;

        public static List<MyPageCoursePlaceDto> of(List<CoursePlace> coursePlaces) {
            List<MyPageCoursePlaceDto> data = new ArrayList<>();
            for (CoursePlace coursePlace : coursePlaces) {
                Place place = coursePlace.getPlace();
                data.add(new MyPageCoursePlaceDto(
                            place.getId(),
                            place.getFirstImage(),
                            place.getName(),
                            place.getAddress(),
                            place.getOverview(),
                            place.getRating()
                ));
            }
            return data;
        }
    }

}
