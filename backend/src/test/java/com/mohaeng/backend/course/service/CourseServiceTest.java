package com.mohaeng.backend.course.service;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.dto.CoursePlaceSearchDto;
import com.mohaeng.backend.course.dto.CourseSearchDto;
import com.mohaeng.backend.course.dto.MainCourseListDto;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.request.CourseReq;
import com.mohaeng.backend.course.dto.request.CourseUpdateReq;
import com.mohaeng.backend.course.dto.response.CourseIdRes;
import com.mohaeng.backend.course.dto.response.CourseListRes;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.course.dto.response.CourseRes;
import com.mohaeng.backend.course.repository.CoursePlaceRepository;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.exception.badrequest.InvalidKeywordPlaceInCourse;
import com.mohaeng.backend.exception.notfound.CourseNotFoundException;
import com.mohaeng.backend.exception.notfound.MemberNotFoundException;
import com.mohaeng.backend.exception.notfound.PlaceNotFoundException;
import com.mohaeng.backend.exception.unauthrized.MemberPermissionDenied;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.domain.Role;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.repository.PlaceRepository;
import org.assertj.core.util.Lists;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CourseServiceTest {
    @Autowired CourseService courseService;
    @Autowired PlaceRepository placeRepository;
    @Autowired CourseRepository courseRepository;
    @Autowired MemberRepository memberRepository;
    @Autowired CoursePlaceRepository coursePlaceRepository;

    @BeforeAll
    public void before(){
        Place place1 = Place.builder()
                .name("경복궁")
                .address("서울시 종로구")
                .firstImage("images/01.jpg")
                .rating(4.5)
                .build();

        Place place2 = Place.builder()
                .name("부산 경복궁")
                .address("부산시 해운대구")
                .firstImage("images/02.jpg")
                .rating(4.3)
                .build();

        Place place3 = Place.builder()
                .name("경복")
                .address("서울시 강남구")
                .firstImage("images/03.jpg")
                .rating(5.0)
                .build();

        Place place4 = Place.builder()
                .name("경복궁 요리")
                .address("서울시 강동구")
                .firstImage("images/04.jpg")
                .rating(4.8)
                .build();

        placeRepository.saveAll(Lists.list(place1, place2, place3, place4));

    }

    @AfterEach
    void afterEach() {
//        coursePlaceRepository.deleteAll();
//        courseRepository.deleteAll();
//        memberRepository.deleteAll();
    }

    @Test
    @DisplayName("장소 검색 - 정상 처리")
    public void placeSearchTest(){
        //Given
        CoursePlaceSearchReq req = new CoursePlaceSearchReq("경복",3L, "5.0");

        //When
        CoursePlaceSearchRes res = courseService.placeSearch(req, PageRequest.ofSize(2));

        //Then
        List<CoursePlaceSearchDto> places = res.getPlaces();
//        System.out.println("places = " + places);

        assertNotNull(res);
        assertEquals(false, res.isHasNext());
        assertEquals(2, places.size());
        assertEquals("경복궁", places.get(0).getName());
    }

    @Test()
    @DisplayName("장소 검색 - 키워드를 넣지 않은 경우 예외 처리")
    public void placeSearchWithoutKeywordTest() throws Exception{
        //Given
        CoursePlaceSearchReq req = new CoursePlaceSearchReq(null, null, null);

        //When
        Exception exception = assertThrows(InvalidKeywordPlaceInCourse.class, () -> {
            courseService.placeSearch(req, PageRequest.ofSize(2));
        });

        //Then
        assertEquals( "코스에 추가할 여행지를 입력하세요.", exception.getMessage());
    }

    @Test
    @Transactional
    @DisplayName("코스 생성 - 정상 처리")
    public void createMyCourse(){
        //Given
        List<Place> placeList = placeRepository.findAll();
        CourseReq courseReq = createCourseReq("코스 제목", List.of(placeList.get(0).getId(), placeList.get(1).getId()));
        Member savedMember = createMember("create");

        //When
        CourseIdRes courseIdRes = courseService.createCourse(courseReq, savedMember.getEmail());

        //Then
        Course course = courseRepository.findById(courseIdRes.getCourseId()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 일정 입니다")
        );

//        System.out.println("course22222 = " + course.getMember());
//        System.out.println("course22222 = " + course.getCoursePlaces().get(0));

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
        Member savedMember = createMember("createNoPlace");

        //When
        Exception exception = assertThrows(PlaceNotFoundException.class, () -> {
            courseService.createCourse(courseReq, savedMember.getEmail());
        });

        //Then
        assertEquals( "장소를 찾을 수 없습니다.", exception.getMessage());
    }

    @Test
    @DisplayName("코스 생성 - 회원이 존재하지 않는 경우 예외 처리")
    public void createMyCourse_no_member() throws Exception{
        //Given
        CourseReq courseReq = createCourseReq("코스 제목", List.of(1L, 2L));

        //When
        Exception exception = assertThrows(MemberNotFoundException.class, () -> {
            courseService.createCourse(courseReq, "test@test.com");
        });

        //Then
        assertEquals("회원을 찾을 수 없습니다.", exception.getMessage());
    }

    @Test
    @DisplayName("코스 단건 조회 - 정상 처리")
    public void getCourse() throws Exception{
        //Given
        List<Place> placeList = placeRepository.findAll();
        CourseReq courseReq = createCourseReq("코스 제목", List.of(placeList.get(3).getId(), placeList.get(1).getId()));
        Member savedMember = createMember("getCourse");
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
        Exception exception = assertThrows(CourseNotFoundException.class, () -> {
            courseService.getCourse(courseId);
        });

        //Then
        assertEquals("코스를 찾을 수 없습니다.", exception.getMessage());
    }

    @Test
    @Transactional
    @DisplayName("코스 수정 - 정상 처리")
    public void updateCourse() throws Exception{
        //Given
        List<Place> placeList = placeRepository.findAll();
        CourseReq originReq = createCourseReq("코스 제목", List.of(placeList.get(0).getId(), placeList.get(1).getId()));
        Member savedMember = createMember("updateCourse");
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
        courseRepository.deleteById(courseIdRes.getCourseId());
    }

    @Test
    @DisplayName("코스 수정 - CourseId가 없는 경우 예외 처리")
    public void updateCourse_courseId_isNull() throws Exception{
        //Given
        Long courseId = 1000L;
        Member savedMember = createMember("updateNoCourseId");
        CourseUpdateReq updateReq = createUpdateCourseReq(List.of(1L, 2L));


        //When
        Exception exception = assertThrows(CourseNotFoundException.class, () -> {
            courseService.updateCourse(savedMember.getEmail(), courseId, updateReq);
        });

        //Then
        assertEquals(exception.getMessage(), "코스를 찾을 수 없습니다.");
    }

    @Test
    @DisplayName("코스 수정 - Member가 없는 경우 예외 처리")
    public void updateCourse_member_isNull() throws Exception{
        //Given
        List<Place> placeList = placeRepository.findAll();
        CourseReq originReq = createCourseReq("코스 제목", List.of(placeList.get(0).getId(), placeList.get(1).getId()));
        Member savedMember = createMember("updateNoMember");

        CourseIdRes courseIdRes = courseService.createCourse(originReq, savedMember.getEmail());

        Long courseId = courseIdRes.getCourseId();
        CourseUpdateReq updateReq = createUpdateCourseReq(List.of(placeList.get(2).getId(), placeList.get(3).getId()));

        //When
        Exception exception = assertThrows(MemberNotFoundException.class, () -> {
            courseService.updateCourse("test@null.com", courseId, updateReq);
        });

        //Then
        assertEquals("회원을 찾을 수 없습니다.", exception.getMessage());
    }

    @Test
    @DisplayName("코스 수정 - 작성자와 요청자가 다른 경우 예외 처리")
    public void updateCourse_different_member() throws Exception{
        //Given
        List<Place> placeList = placeRepository.findAll();
        CourseReq originReq = createCourseReq("코스 제목", List.of(placeList.get(0).getId(), placeList.get(1).getId()));
        Member savedMember = createMember("updateCourseDiffMember");

        CourseIdRes courseIdRes = courseService.createCourse(originReq, savedMember.getEmail());
        System.out.println("courseIdRes.getCourseId() ================== " + courseIdRes.getCourseId());

        Long courseId = courseIdRes.getCourseId();
        CourseUpdateReq updateReq = createUpdateCourseReq(List.of(placeList.get(2).getId(), placeList.get(3).getId()));
        Member newMem = createMember("newMem");

        //When
        Exception exception = assertThrows(MemberPermissionDenied.class, () -> {
            courseService.updateCourse(newMem.getEmail(), courseId, updateReq);
        });

        //Then
        assertEquals("요청자와 작성자가 일치하지 않습니다.", exception.getMessage());
    }

    @Test
    @DisplayName("코스 삭제 - 정상 처리")
    public void deleteCourse() throws Exception{
        //Given
        CourseReq originReq = createCourseReq("코스 제목", List.of(1L, 2L));
        Member savedMember = createMember("deleteCourse");
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
        Member savedMember = createMember("deleteCourseDiffMem");

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
        Exception exception = assertThrows(MemberPermissionDenied.class, () -> {
            courseService.deleteCourse(newMember.getEmail(), courseId);
        });

        //Then
        assertEquals("요청자와 작성자가 일치하지 않습니다.", exception.getMessage());
    }

    @Test
    @DisplayName("코스 삭제 - CourseId가 없는 경우 예외 처리")
    public void deleteCourse_courseId_isNull() throws Exception{
        //Given
        Long courseId = 1000L;
        Member savedMember = createMember("deleteCourseIdNull");

        //When
        Exception exception = assertThrows(CourseNotFoundException.class, () -> {
            courseService.deleteCourse(savedMember.getEmail(), courseId);
        });

        //Then
        assertEquals("코스를 찾을 수 없습니다.", exception.getMessage());
    }

    @Test
    @DisplayName("코스 검색 - 정상 처리")
    public void searchCourse() throws Exception{
        //Given
        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
        CourseReq originReq2 = createCourseReq("코스 소개합니다", List.of(3L, 4L));
        Member savedMember = createMember("searchCourse");
        CourseIdRes courseIdRes1 = courseService.createCourse(originReq1, savedMember.getEmail());
        CourseIdRes courseIdRes2 = courseService.createCourse(originReq2, savedMember.getEmail());

        CourseSearchDto courseSearchDto = CourseSearchDto.builder()
                .keyword("바다")
                .build();

        PageRequest pageRequest = PageRequest.of(0, 2);

        //When
        CourseListRes courseList = courseService.getCourseList(courseSearchDto, pageRequest, savedMember.getEmail());

        //Then
        assertEquals(1, courseList.getCourseList().size());
        assertEquals(originReq1.getTitle(), courseList.getCourseList().get(0).getTitle());
        assertEquals(1, courseList.getTotalPages());
    }

    private CourseReq createCourseReq(String title, List<Long> placeIds) {
        CourseReq myCourseReq = CourseReq.builder()
                .title(title)
                .courseDays("1박2일")
                .isPublished(true)
                .region("서울")
                .thumbnailUrl("images/01.jpg")
                .startDate("2023-03-30")
                .endDate("2023-03-31")
                .content("나의 첫번재 일정 입니다.")
                .placeIds(placeIds)
                .build();
        return myCourseReq;
    }

    private Member createMember(String email) {
        Member member = Member.builder()
                .nickName("nick")
                .name("김모행")
                .email(email + "@test")
                .role(Role.NORMAL)
                .build();
        Member savedMember = memberRepository.save(member);
        return savedMember;
    }

    private CourseUpdateReq createUpdateCourseReq(List<Long> placeIds) {
        CourseUpdateReq updateReq = CourseUpdateReq.builder()
                .title("수정된 제목 입니다")
                .courseDays("2박3일")
                .isPublished(true)
                .region("서울")
                .thumbnailUrl("images/01.jpg")
                .startDate("2023-04-01")
                .endDate("2023-04-05")
                .content("나의 첫번재 일정 입니다.")
                .placeIds(placeIds)
                .build();
        return updateReq;
    }

}