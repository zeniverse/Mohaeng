package com.mohaeng.backend.course.service;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.domain.CoursePlace;
import com.mohaeng.backend.course.dto.*;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.request.CourseReq;
import com.mohaeng.backend.course.dto.request.CourseUpdateReq;
import com.mohaeng.backend.course.dto.response.CourseIdRes;
import com.mohaeng.backend.course.dto.response.CourseListRes;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.course.dto.response.CourseRes;
import com.mohaeng.backend.course.repository.CourseBookmarkRepository;
import com.mohaeng.backend.course.repository.CourseLikesRepository;
import com.mohaeng.backend.course.repository.CoursePlaceRepository;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.domain.PlaceImage;
import com.mohaeng.backend.place.repository.PlaceImageRepository;
import com.mohaeng.backend.place.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.mohaeng.backend.course.domain.QCourse.course;
import static java.util.Objects.isNull;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CourseService {

    private final PlaceRepository placeRepository;
    private final MemberRepository memberRepository;
    private final CourseRepository courseRepository;
    private final CoursePlaceRepository coursePlaceRepository;
    private final PlaceImageRepository placeImageRepository;
    private final CourseLikesRepository courseLikesRepository;
    private final CourseBookmarkRepository courseBookmarkRepository;

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
    public CourseIdRes createCourse(CourseReq req,String memberEmail) {

        // 유저 확인
        Member member = isMember(memberEmail);

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
                .likeCount(0)
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

    public CourseRes getCourse(Long courseId) {
        // 1. courseId로 course 조회
        Course findCourse = isCourse(courseId);

        // 2. courseId로 CoursePlace 조회
        List<CoursePlace> coursePlaces = coursePlaceRepository.findAllByCourseId(courseId);
        List<CourseInPlaceDto> courseInPlaceDtoList = new ArrayList<>();

        // 3. CoursePlaces에 담긴 Place 정보와 PlaceImage를 사용해 CourseInPlaceDTO에 담아준다.
        for (CoursePlace coursePlace : coursePlaces) {
            Place place = coursePlace.getPlace();
            PlaceImage findPlaceImage = placeImageRepository.findFirstByPlace(place);
            courseInPlaceDtoList.add(
                    CourseInPlaceDto.builder()
                            .placeId(place.getId())
                            .name(place.getName())
                            .imgUrl(findPlaceImage.getImgUrl())
                            .address(place.getAddress())
                            .mapX(place.getMapX())
                            .mapY(place.getMapY())
                            .build()
            );
        }

        return CourseRes.from(findCourse, courseInPlaceDtoList);
    }

    @Transactional
    public CourseIdRes updateCourse(String memberEmail, Long courseId, CourseUpdateReq req) {

        // 2. 코스 존재 여부 & 작성자와 요청자가 같은지 확인
        Course course = isCourse(courseId);
        isWriter(memberEmail, course.getMember());

        List<CoursePlace> coursePlaces = coursePlaceRepository.findAllByCourseId(courseId);
        coursePlaceRepository.deleteAllInBatch(coursePlaces);

        List<CoursePlace> updatedCoursePlaces = new ArrayList<>();
        for (Long id : req.getPlaceIds()) {
            Place place = placeRepository.findById(id).orElseThrow(
                    // TODO: Exception 처리
                    () -> new IllegalArgumentException("존재하지 않는 장소 입니다.")
            );
            updatedCoursePlaces.add(
                    CoursePlace.builder()
                            .course(course)
                            .place(place)
                            .build()
            );
        }

        coursePlaceRepository.saveAll(updatedCoursePlaces);
        course.addCoursePlaces(updatedCoursePlaces);
        course.updateCourse(req);

        return CourseIdRes.from(course.getId());
    }

    @Transactional
    public void deleteCourse(String memberEmail, Long courseId) {

        // 1. 코스 존재 여부 확인
        Course course = isCourse(courseId);

        // 2. 작성자와 요청자가 같은지 확인
        isWriter(memberEmail, course.getMember());

        // 3. course soft delete 처리
        course.updateDeletedDate(course.getCoursePlaces());
    }


    public CourseListRes getCourseList(CourseSearchDto courseSearchDto, Pageable pageable, String memberEmail) {
        // 1.로그인 유무 화인
        Member member = checkLogin(memberEmail);

        // 2. 검색 조건으로 검색 결과 조회
        Page<Course> courses = courseRepository.findAllCourseWithKeyword(courseSearchDto, pageable);

        // 3. 검색 결과 CourseListDto 타입으로 변경
        List<CourseListDto> courseList = new ArrayList<>();
        for (Course course : courses) {
            boolean isLike = false;
            boolean isBookmark = false;
            if(member != null){
                isLike = courseLikesRepository.existsCourseLikesByMemberAndCourse(member, course);
                isBookmark = courseBookmarkRepository.existsCourseBookmarkByMemberAndCourse(member, course);
            }
            CourseListDto dto = CourseListDto.from(course, isLike, isBookmark);
            courseList.add(dto);
        }

//        List<CourseListDto> courseList = courses.stream()
//                .map(course -> CourseListDto.from(course))
//                .collect(Collectors.toList());
//
        return CourseListRes.from(courseList, courses.getTotalElements(), courses.getTotalPages());
    }


    public List<MainCourseListDto> getMainCourse(String memberEmail) {
        // 1.로그인 유무 화인
        Member member = checkLogin(memberEmail);

        // 2. 코스 조회 결과 불러오기기
        List<Course> courseList = courseRepository.findTop10ByOrderByLikeCountDesc();

        List<MainCourseListDto> MainCourseListDtoList = new ArrayList<>();
        for (Course course : courseList) {
            boolean isLike = false;
            boolean isBookmark = false;
            if(member != null){
                isLike = courseLikesRepository.existsCourseLikesByMemberAndCourse(member, course);
                isBookmark = courseBookmarkRepository.existsCourseBookmarkByMemberAndCourse(member, course);
            }
            MainCourseListDto dto = MainCourseListDto.from(course, isLike, isBookmark);
            MainCourseListDtoList.add(dto);
        }

        return MainCourseListDtoList;
    }


    private Member isWriter(String memberEmail, Member writer){
        Member member = memberRepository.findByEmailAndDeletedDateIsNull(memberEmail).orElseThrow(
                // TODO: Exception 처리
                () -> new IllegalArgumentException("존재하지 않는 member 입니다.")
        );

        if(!member.getEmail().equals(writer.getEmail()))
            // TODO: Exception 처리
            throw new RuntimeException("요청자와 작성자가 일치하지 않습니다.");
        return member;

    }

    private Member checkLogin(String email){
        return isNull(email) ? null : memberRepository.findByEmailAndDeletedDateIsNull(email)
                                    .orElseThrow(()->new IllegalArgumentException("존재하지 않는 member 입니다."));
    }

    private Member isMember(String memberEmail){
        return memberRepository.findByEmailAndDeletedDateIsNull(memberEmail).orElseThrow(
                // TODO: Exception 처리
                () -> new IllegalArgumentException("존재하지 않는 member 입니다.")
        );
    }

    private Course isCourse(Long id){
        return courseRepository.findById(id).orElseThrow(
                // TODO: Exception 처리
                () -> new IllegalArgumentException("존재하지 않는 코스 입니다.")
        );
    }

}