package com.mohaeng.backend.course.service;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.domain.CoursePlace;
import com.mohaeng.backend.course.dto.CoursePlaceSearchDto;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.request.CourseReq;
import com.mohaeng.backend.course.dto.response.CourseIdRes;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.course.repository.CoursePlaceRepository;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.repository.PlaceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class CourseService {

    private final PlaceRepository placeRepository;
    private final MemberRepository memberRepository;
    private final CourseRepository courseRepository;
    private final CoursePlaceRepository coursePlaceRepository;

    public CoursePlaceSearchRes placeSearch(CoursePlaceSearchReq req, Pageable pageable) {
        // keyword에 null이 담겨있을 때
        if (req.getKeyword() == null){
            throw new IllegalArgumentException("keyword 값이 비어있습니다.");
        }
        // rating에 점수가 담겨있지 않을 때
        Double rating = req.parseRatingToDouble(req.getLastRating());
        Slice<CoursePlaceSearchDto> placeInCourse = placeRepository.findPlaceInCourse(req.getKeyword(), req.getLastPlaceId(), rating, pageable);

        return CoursePlaceSearchRes.from(placeInCourse);
    }

    @Transactional
    public CourseIdRes createCourse(CourseReq req, String memberEmail) {

        Member member = memberRepository.findByEmail(memberEmail).orElseThrow(
                // TODO: Exception 처리
                () -> new IllegalArgumentException("존재하지 않는 member 입니다.")
        );

        Course course = Course.builder()
                .title(req.getTitle())
                .startDate(req.getStartDate())
                .endDate(req.getEndDate())
                .isPublished(req.getIsPublished())
                .courseDays(req.getCourseDays())
                .region(req.getRegion())
                .thumbnailUrl(req.getThumbnailUrl())
                .content(req.getContent())
                .isPublished(false)
                .likeCount(8)
                .member(member)
                .build();

        List<CoursePlace> coursePlaces = new ArrayList<>();
        for (Long id : req.getPlaceIds()) {
            Place place = placeRepository.findById(id).orElseThrow(
                    // TODO: Exception 처리
                    () -> new IllegalArgumentException("존재하지 않는 장소 입니다.")
            );
            coursePlaces.add(
                    CoursePlace.builder()
                            .course(course)
                            .place(place)
                            .build()
            );
        }

        Course createdCourse = courseRepository.save(course);
        coursePlaceRepository.saveAll(coursePlaces);

        createdCourse.addCoursePlaces(coursePlaces);

        return CourseIdRes.from(createdCourse.getId());
    }
}
