package com.mohaeng.backend.course.service;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.dto.CoursePlaceSearchDto;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.request.CourseReq;
import com.mohaeng.backend.course.dto.request.CourseUpdateReq;
import com.mohaeng.backend.course.dto.response.CourseIdRes;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.course.dto.response.CourseRes;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.domain.Role;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.domain.PlaceImage;
import com.mohaeng.backend.place.repository.PlaceImageRepository;
import com.mohaeng.backend.place.repository.PlaceRepository;
import org.assertj.core.util.Lists;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CourseServiceTest {
    @Autowired CourseService courseService;
    @Autowired PlaceRepository placeRepository;
    @Autowired PlaceImageRepository placeImageRepository;
    @Autowired CourseRepository courseRepository;
    @Autowired MemberRepository memberRepository;

    @BeforeAll
    public void before(){
        Place place1 = Place.builder()
                .name("경복궁")
                .addr1("서울시 종로구")
                .rating(4.5)
                .build();

        Place place2 = Place.builder()
                .name("부산 경복궁")
                .addr1("부산시 해운대구")
                .rating(4.5)
                .build();

        Place place3 = Place.builder()
                .name("경복")
                .addr1("서울시 강남구")
                .rating(5.0)
                .build();

        Place place4 = Place.builder()
                .name("경복궁 요리")
                .addr1("서울시 강동구")
                .rating(5.0)
                .build();

        placeRepository.saveAll(Lists.list(place1, place2, place3, place4));

        PlaceImage placeImage1 = PlaceImage.builder()
                .origin_name("image_01.jpg")
                .name("001234231")
                .imgUrl("image/0.jpg")
                .place(place1)
                .build();

        PlaceImage placeImage2 = PlaceImage.builder()
                .origin_name("image_02.jpg")
                .name("00")
                .imgUrl("image/00.jpg")
                .place(place1)
                .build();

        PlaceImage placeImage3 = PlaceImage.builder()
                .origin_name("image_03.jpg")
                .name("1121")
                .imgUrl("image/1121.jpg")
                .place(place2)
                .build();

        PlaceImage placeImage4 = PlaceImage.builder()
                .origin_name("image_04.jpg")
                .name("11111")
                .imgUrl("image/11111.jpg")
                .place(place3)
                .build();

        PlaceImage placeImage5 = PlaceImage.builder()
                .origin_name("image_05.jpg")
                .name("222")
                .imgUrl("image/222.jpg")
                .place(place4)
                .build();

        placeImageRepository.saveAll(
                Lists.list(placeImage1, placeImage2, placeImage3, placeImage4, placeImage5));
    }

    @AfterEach
    void afterEach() {
        memberRepository.deleteAll();
    }

    @Test
    @DisplayName("장소 검색 - 정상 처리")
    public void placeSearchTest(){
        //Given
        List<Place> placeList = placeRepository.findAll();
        CoursePlaceSearchReq req = new CoursePlaceSearchReq("경복", placeList.get(3).getId(), "5.0");

        //When
        CoursePlaceSearchRes res = courseService.placeSearch(req, PageRequest.ofSize(2));

        //Then
        List<CoursePlaceSearchDto> places = res.getPlaces();
        System.out.println("places = " + places);
        List<Place> all = placeRepository.findAll();
        for (Place place : all) {
            System.out.println("place = " + place);
        }

        assertNotNull(res);
        assertEquals(true, res.isHasNext());
        assertEquals(2, places.size());
        assertEquals("image/11111.jpg", places.get(0).getImgUrl());
    }

    @Test()
    @DisplayName("장소 검색 - 키워드를 넣지 않은 경우 예외 처리")
    public void placeSearchWithoutKeywordTest() throws Exception{
        //Given
        CoursePlaceSearchReq req = new CoursePlaceSearchReq(null, null, null);

        //When
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            courseService.placeSearch(req, PageRequest.ofSize(2));
        });

        //Then
        assertEquals(exception.getMessage(), "keyword 값이 비어있습니다.");
    }

    @Test
    @Transactional
    @DisplayName("코스 생성 - 정상 처리")
    public void createMyCourse(){
        //Given
        List<Place> placeList = placeRepository.findAll();
        CourseReq courseReq = createCourseReq("코스 제목", List.of(placeList.get(0).getId(), placeList.get(1).getId()));
        Member savedMember = createMember();

        //When
        CourseIdRes courseIdRes = courseService.createCourse(courseReq, savedMember.getEmail());

        //Then
        Course course = courseRepository.findById(courseIdRes.getCourseId()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 일정 입니다")
        );

        System.out.println("course22222 = " + course.getMember());
        System.out.println("course22222 = " + course.getCoursePlaces().get(0));

        assertNotNull(course.getCoursePlaces());
        assertEquals(2, course.getCoursePlaces().size());
        assertEquals(placeList.get(0).getName(), course.getCoursePlaces().get(0).getPlace().getName());
        memberRepository.deleteAll();
        courseRepository.deleteById(courseIdRes.getCourseId());
    }

    @Test
    @DisplayName("코스 생성 - 장소가 존재하지 않는 경우 예외 처리")
    public void createMyCourse_no_place() throws Exception{
        //Given
        CourseReq courseReq = createCourseReq("코스 제목", List.of(1L, 10000L));
        Member savedMember = createMember();

        //When
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            courseService.createCourse(courseReq, savedMember.getEmail());
        });

        //Then
        assertEquals(exception.getMessage(), "존재하지 않는 장소 입니다.");
    }

    @Test
    @DisplayName("코스 생성 - 회원이 존재하지 않는 경우 예외 처리")
    public void createMyCourse_no_member() throws Exception{
        //Given
        CourseReq courseReq = createCourseReq("코스 제목", List.of(1L, 2L));

        //When
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            courseService.createCourse(courseReq, "test@test.com");
        });

        //Then
        assertEquals(exception.getMessage(), "존재하지 않는 member 입니다.");
    }

    @Test
    @DisplayName("코스 단건 조회 - 정상 처리")
    public void getCourse() throws Exception{
        //Given
        List<Place> placeList = placeRepository.findAll();
        CourseReq courseReq = createCourseReq("코스 제목", List.of(placeList.get(3).getId(), placeList.get(1).getId()));
        Member savedMember = createMember();
        CourseIdRes courseIdRes = courseService.createCourse(courseReq, savedMember.getEmail());


        //When
        CourseRes courseRes = courseService.getCourse(courseIdRes.getCourseId());
        System.out.println("courseRes = " + courseRes);

        //Then
        assertNotNull(courseRes);
        assertNotNull(courseRes.getPlaces());
        assertEquals(2, courseRes.getPlaces().size());
        assertEquals(placeList.get(3).getName(), courseRes.getPlaces().get(0).getName());
    }

    @Test
    @DisplayName("코스 단건 조회 - CourseId가 없는 경우 예외 처리")
    public void getCourse_courseId_isNull() throws Exception{
        //Given
        Long courseId = 1000L;

        //When
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            courseService.getCourse(courseId);
        });

        //Then
        assertEquals(exception.getMessage(), "존재하지 않는 코스 입니다.");
    }

    @Test
    @Transactional
    @DisplayName("코스 수정 - 정상 처리")
    public void updateCourse() throws Exception{
        //Given
        List<Place> placeList = placeRepository.findAll();
        CourseReq originReq = createCourseReq("코스 제목", List.of(placeList.get(0).getId(), placeList.get(1).getId()));
        Member savedMember = createMember();
        CourseIdRes courseIdRes = courseService.createCourse(originReq, savedMember.getEmail());

        Long courseId = courseIdRes.getCourseId();
        CourseUpdateReq updateReq = createUpdateCourseReq(List.of(placeList.get(2).getId(), placeList.get(3).getId()));

        //When
        CourseIdRes updateIdRes = courseService.updateCourse(savedMember.getEmail(), courseId, updateReq);
        Course course = courseRepository.findById(updateIdRes.getCourseId()).orElseThrow(null);
        System.out.println("course = " + course.getCoursePlaces());

        //Then
        assertNotNull(course);
        assertEquals(2, course.getCoursePlaces().size());
        assertEquals(updateReq.getTitle(), course.getTitle());
        assertEquals(placeList.get(2).getName(), course.getCoursePlaces().get(0).getPlace().getName());
        memberRepository.deleteAll();
        courseRepository.deleteById(courseId);

    }

    @Test
    @DisplayName("코스 수정 - CourseId가 없는 경우 예외 처리")
    public void updateCourse_courseId_isNull() throws Exception{
        //Given
        Long courseId = 1000L;
        Member savedMember = createMember();
        CourseUpdateReq updateReq = createUpdateCourseReq(List.of(1L, 2L));


        //When
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            courseService.updateCourse(savedMember.getEmail(), courseId, updateReq);
        });

        //Then
        assertEquals(exception.getMessage(), "존재하지 않는 course 입니다.");
    }

    @Test
    @DisplayName("코스 수정 - Member가 없는 경우 예외 처리")
    public void updateCourse_member_isNull() throws Exception{
        //Given
        List<Place> placeList = placeRepository.findAll();
        CourseReq originReq = createCourseReq("코스 제목", List.of(placeList.get(0).getId(), placeList.get(1).getId()));
        Member savedMember = createMember();

        CourseIdRes courseIdRes = courseService.createCourse(originReq, savedMember.getEmail());

        Long courseId = courseIdRes.getCourseId();
        CourseUpdateReq updateReq = createUpdateCourseReq(List.of(placeList.get(2).getId(), placeList.get(3).getId()));

        //When
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            courseService.updateCourse("test@null.com", courseId, updateReq);
        });

        //Then
        assertEquals(exception.getMessage(), "존재하지 않는 member 입니다.");
    }

    @Test
    @DisplayName("코스 수정 - 작성자와 요청자가 다른 경우 예외 처리")
    public void updateCourse_different_member() throws Exception{
        //Given
        List<Place> placeList = placeRepository.findAll();
        CourseReq originReq = createCourseReq("코스 제목", List.of(placeList.get(0).getId(), placeList.get(1).getId()));
        Member savedMember = createMember();

        CourseIdRes courseIdRes = courseService.createCourse(originReq, savedMember.getEmail());

        Long courseId = courseIdRes.getCourseId();
        CourseUpdateReq updateReq = createUpdateCourseReq(List.of(placeList.get(2).getId(), placeList.get(3).getId()));

        Member newMember = Member.builder()
                .nickName("nick")
                .name("뉴모행")
                .email("new@new")
                .role(Role.NORMAL)
                .build();
        Member newMem = memberRepository.save(newMember);

        //When
        Exception exception = assertThrows(RuntimeException.class, () -> {
            courseService.updateCourse(newMem.getEmail(), courseId, updateReq);
        });

        //Then
        assertEquals(exception.getMessage(), "요청자와 작성자가 일치하지 않습니다.");
    }

    @Test
    @DisplayName("코스 삭제 - 정상 처리")
    public void deleteCourse() throws Exception{
        //Given
        CourseReq originReq = createCourseReq("코스 제목", List.of(1L, 2L));
        Member savedMember = createMember();
        CourseIdRes courseIdRes = courseService.createCourse(originReq, savedMember.getEmail());

        Long courseId = courseIdRes.getCourseId();

        //When
        courseService.deleteCourse(savedMember.getEmail(), courseId);
        List<Course> courseList = courseRepository.findAll();

        //Then
        assertEquals(0, courseList.size());
        assertThrows(IllegalArgumentException.class,
                () -> courseRepository.findById(courseId).orElseThrow(() -> new IllegalArgumentException()));
    }

    @Test
    @DisplayName("코스 삭제 - 작성자와 요청자가 다른 경우 예외 처리")
    public void deleteCourse_different_member() throws Exception{
        //Given
        List<Place> placeList = placeRepository.findAll();
        CourseReq originReq = createCourseReq("코스 제목", List.of(placeList.get(0).getId(), placeList.get(1).getId()));
        Member savedMember = createMember();

        CourseIdRes courseIdRes = courseService.createCourse(originReq, savedMember.getEmail());

        Long courseId = courseIdRes.getCourseId();

        Member newMember = Member.builder()
                .nickName("nick")
                .name("뉴모행")
                .email("new@new")
                .role(Role.NORMAL)
                .build();
        Member newMem = memberRepository.save(newMember);

        //When
        Exception exception = assertThrows(RuntimeException.class, () -> {
            courseService.deleteCourse(newMember.getEmail(), courseId);
        });

        //Then
        assertEquals(exception.getMessage(), "요청자와 작성자가 일치하지 않습니다.");
    }

    @Test
    @DisplayName("코스 삭제 - CourseId가 없는 경우 예외 처리")
    public void deleteCourse_courseId_isNull() throws Exception{
        //Given
        Long courseId = 1000L;
        Member savedMember = createMember();

        //When
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            courseService.deleteCourse(savedMember.getEmail(), courseId);
        });

        //Then
        assertEquals(exception.getMessage(), "존재하지 않는 course 입니다.");
    }


    private CourseReq createCourseReq(String title, List<Long> placeIds) {
        CourseReq myCourseReq = CourseReq.builder()
                .title(title)
                .courseDays("1박2일")
                .isPublished(false)
                .region("서울")
                .thumbnailUrl("images/01.jpg")
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusDays(1))
                .content("나의 첫번재 일정 입니다.")
                .placeIds(placeIds)
                .build();
        return myCourseReq;
    }

    private Member createMember() {
        Member member = Member.builder()
                .nickName("nick")
                .name("김모행")
                .email("test@test")
                .role(Role.NORMAL)
                .build();
        Member savedMember = memberRepository.save(member);
        return savedMember;
    }

    private CourseUpdateReq createUpdateCourseReq(List<Long> placeIds) {
        CourseUpdateReq updateReq = CourseUpdateReq.builder()
                .title("수정된 제목 입니다")
                .courseDays("2박3일")
                .isPublished(false)
                .region("서울")
                .thumbnailUrl("images/01.jpg")
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusDays(1))
                .content("나의 첫번재 일정 입니다.")
                .placeIds(placeIds)
                .build();
        return updateReq;
    }

}


