//import com.mohaeng.backend.place.domain.PlaceImage;
//import com.mohaeng.backend.place.repository.PlaceImageRepository;
//import com.mohaeng.backend.place.repository.PlaceRepository;
//import org.assertj.core.util.Lists;
//import org.junit.jupiter.api.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertThrows;

//@SpringBootTest
//@TestInstance(TestInstance.Lifecycle.PER_CLASS)
//class CourseLikesServiceTest {

//
//    @Autowired CourseLikesService courseLikesService;
//    @Autowired CourseService courseService;
//    @Autowired PlaceRepository placeRepository;
//    @Autowired PlaceImageRepository placeImageRepository;
//    @Autowired CourseRepository courseRepository;
//    @Autowired MemberRepository memberRepository;
//
//    @BeforeAll
//    public void before(){
//        Place place1 = Place.builder()
//                .name("경복궁")
//                .address("서울시 종로구")
//                .rating(4.5)
//                .build();
//
//        Place place2 = Place.builder()
//                .name("부산 경복궁")
//                .address("부산시 해운대구")
//                .rating(4.5)
//                .build();
//
//        placeRepository.saveAll(Lists.list(place1, place2));
//
//        PlaceImage placeImage1 = PlaceImage.builder()
//                .origin_name("image_01.jpg")
//                .name("001234231")
//                .imgUrl("image/0.jpg")
//                .place(place1)
//                .build();
//
//        PlaceImage placeImage3 = PlaceImage.builder()
//                .origin_name("image_03.jpg")
//                .name("1121")
//                .imgUrl("image/1121.jpg")
//                .place(place2)
//                .build();
//
//        placeImageRepository.saveAll(
//                Lists.list(placeImage1, placeImage3));
//    }
//
//    @AfterEach
//    void afterEach() {
////        memberRepository.deleteAll();
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 - 정상 처리")
//    public void addCourseLikes() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("addCourseLikes");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//
//        //When
//        courseLikesService.addLikes(courseId, savedMember.getEmail());
//
//        //Then
//        Course savedCourse = courseRepository.findById(courseId).orElseThrow(null);
//        assertEquals(1, savedCourse.getLikeCount());
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 - 로그인 하지 않은 경우 예외 처리")
//    public void addCourseLikes_not_member() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("addCourseLikesNotmem");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//
//        //When
//        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
//            courseLikesService.addLikes(courseId, "null@null.com");
//        });
//
//        //Then
//        assertEquals(exception.getMessage(), "존재하지 않는 member 입니다.");
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 - 코스가 존재하지 않는 경우 예외 처리")
//    public void addCourseLikes_courseId_null() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("addCourseLikesNullId");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        //When
//        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
//            courseLikesService.addLikes(1000L, savedMember.getEmail());
//        });
//
//        //Then
//        assertEquals(exception.getMessage(), "존재하지 않는 코스 입니다.");
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 - 이미 좋아요를 누른 경우 예외 처리")
//    public void addCourseLikes_already_likes() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("addCourseLikesAlready");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//
//        // 좋아요 처리
//        courseLikesService.addLikes(courseId, savedMember.getEmail());
//
//        //When
//        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
//            courseLikesService.addLikes(courseId, savedMember.getEmail());
//        });
//
//        //Then
//        assertEquals(exception.getMessage(), "이미 좋아요를 누른 회원입니다.");
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 취소 - 정상 처리")
//    public void cancelCourseLikes() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("cancelLikes");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//        courseLikesService.addLikes(courseId, savedMember.getEmail());
//
//        //When
//        courseLikesService.cancelLikes(courseId, savedMember.getEmail());
//
//        //Then
//        Course savedCourse = courseRepository.findById(courseId).orElseThrow(null);
//        assertEquals(0, savedCourse.getLikeCount());
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 취소 - 로그인 하지 않은 경우 예외 처리")
//    public void cancelCourseLikes_not_member() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("cancelLikesNotMem");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//        courseLikesService.addLikes(courseId, savedMember.getEmail());
//
//        //When
//        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
//            courseLikesService.cancelLikes(courseId, "null@null.com");
//        });
//
//        //Then
//        assertEquals(exception.getMessage(), "존재하지 않는 member 입니다.");
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 취소- 코스가 존재하지 않는 경우 예외 처리")
//    public void cancelCourseLikes_courseId_null() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("cancelLikesNoId");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//        courseLikesService.addLikes(courseId, savedMember.getEmail());
//
//        //When
//        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
//            courseLikesService.cancelLikes(1000L, savedMember.getEmail());
//        });
//
//        //Then
//        assertEquals(exception.getMessage(), "존재하지 않는 코스 입니다.");
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 취소 - 유저가 좋아요 버튼을 누른적 없는 경우 에외 처리")
//    public void cancelCourseLikes_not_likes() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("cancelLikesNoLike");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//
//        //When
//        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
//            courseLikesService.cancelLikes(courseId, savedMember.getEmail());
//        });
//
//        //Then
//        assertEquals(exception.getMessage(), "member가 해당 course의 좋아요룰 누르지 않았습니다");
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 존재 확인(true) - 정상 처리")
//    public void existsCourseLikes() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("existsLikes");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//        courseLikesService.addLikes(courseId, savedMember.getEmail());
//
//        //When
//        boolean isExists = courseLikesService.isExistCourseLikes(courseId, savedMember.getEmail());
//
//        //Then
//        assertEquals(true, isExists);
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 존재 확인(false) - 정상 처리")
//    public void existsCourseLikes2() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("existsLikes2");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//        courseLikesService.addLikes(courseId, savedMember.getEmail());
//        courseLikesService.cancelLikes(courseId, savedMember.getEmail());
//
//        //When
//        boolean isExists = courseLikesService.isExistCourseLikes(courseId, savedMember.getEmail());
//
//        //Then
//        assertEquals(false, isExists);
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 존재 확인 - 로그인 하지 않은 경우 예외 처리")
//    public void existsCourseLikes_not_member() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("existsLikesNotMem");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//        courseLikesService.addLikes(courseId, savedMember.getEmail());
//
//        //When
//        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
//            courseLikesService.isExistCourseLikes(courseId, "null@null.com");
//        });
//
//        //Then
//        assertEquals(exception.getMessage(), "존재하지 않는 member 입니다.");
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 존재 확인 - 코스가 존재하지 않는 경우 예외 처리")
//    public void existsCourseLikes_courseId_null() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("existsLikesNoId");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//        courseLikesService.addLikes(courseId, savedMember.getEmail());
//
//        //When
//        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
//            courseLikesService.isExistCourseLikes(1000L, savedMember.getEmail());
//        });
//
//        //Then
//        assertEquals(exception.getMessage(), "존재하지 않는 코스 입니다.");
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 count - 정상 처리")
//    public void countCourseLikes() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("countLikes");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//        courseLikesService.addLikes(courseId, savedMember.getEmail());
//
//        //When
//        CourseLikesRes courseLikesRes = courseLikesService.countLikes(courseId);
//
//        //Then
//        assertEquals(1, courseLikesRes.getTotalLikes());
//    }
//
//    @Test
//    @DisplayName("코스 좋아요 count - 코스가 존재하지 않는 경우 예외 처리")
//    public void countCourseLikes_courseId_null() throws Exception{
//        //Given
//        CourseReq originReq1 = createCourseReq("바다 구경 코스", List.of(1L, 2L));
//        Member savedMember = createMember("countLikesNoId");
//        CourseIdRes courseIdRes = courseService.createCourse(originReq1, savedMember.getEmail());
//
//        Long courseId = courseIdRes.getCourseId();
//        courseLikesService.addLikes(courseId, savedMember.getEmail());
//
//        //When
//        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
//            courseLikesService.countLikes(1000L);
//        });
//
//        //Then
//        assertEquals(exception.getMessage(), "존재하지 않는 코스 입니다.");
//    }
//
//
//    private CourseReq createCourseReq(String title, List<Long> placeIds) {
//        CourseReq myCourseReq = CourseReq.builder()
//                .title(title)
//                .courseDays("1박2일")
//                .isPublished(false)
//                .region("서울")
//                .thumbnailUrl("images/01.jpg")
//                .startDate(LocalDateTime.now())
//                .endDate(LocalDateTime.now().plusDays(1))
//                .content("나의 첫번재 일정 입니다.")
//                .placeIds(placeIds)
//                .build();
//        return myCourseReq;
//    }
//
//    private Member createMember(String email) {
//        Member member = Member.builder()
//                .nickName("nick")
//                .name("김모행")
//                .email(email + "@test")
//                .role(Role.NORMAL)
//                .build();
//        Member savedMember = memberRepository.save(member);
//        return savedMember;
//    }
//}