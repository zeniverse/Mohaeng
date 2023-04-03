package com.mohaeng.backend.member.service;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.domain.CourseBookmark;
import com.mohaeng.backend.course.repository.CourseBookmarkRepository;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.domain.Role;
import com.mohaeng.backend.member.dto.response.MyPageCourseBookMarkDto;
import com.mohaeng.backend.member.repository.MemberRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;


@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class MyPageServiceTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private CourseBookmarkRepository courseBookmarkRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private MyPageService myPageService;


    @AfterEach
    public void end() {
        memberRepository.deleteAll();
    }

    @Test
    public void 코스_전체_조회() {
        //given
        Member member = createUser("kim@naver.com", "kim");
        Course course1 = createCourse(member);
        Course course2 = createCourse(member);
        createCourseBookMark(member, course1);
        createCourseBookMark(member, course2);

        //when
        List<MyPageCourseBookMarkDto> allBookMarkCourse = myPageService.findAllBookMarkCourse(member.getEmail());

        //then
        Assertions.assertEquals(allBookMarkCourse.size(), 2);
    }

    @Test
    public void 코스_단건_조회() {
        //given
        Member member = createUser("kim@naver.com", "kim");
        Course course = createCourse(member);
        createCourseBookMark(member, course);
        List<CourseBookmark> courseBookmarkList = courseBookmarkRepository.findAll();
        long size = courseBookmarkList.size();

        //when
        MyPageCourseBookMarkDto oneBookMarkedCourse = myPageService.findOneBookMarkedCourse(member.getEmail(), size);

        //then
        Assertions.assertEquals(oneBookMarkedCourse.getBookMarkId(), size);
    }

    @Test
    public void 단건조회_잘못된_멤버_접근_예외_발생() {
        //given
        Member member = Member.builder()
                .email("kimmohaeng@naver.com")
                .nickName("testNick")
                .role(Role.NORMAL)
                .name("mohaeng").build();

        //when
        Exception e = Assertions.assertThrows(IllegalArgumentException.class, () -> {
            myPageService.findAllBookMarkCourse(member.getEmail());
        });

        //then
        Assertions.assertEquals(e.getMessage(), "Not_Exist_Member");

    }

    @Test
    public void 존재하지_않는_북마크_예외_발생() {
        //given
        Member member = createUser("kim@naver.com", "kim");
        long size = courseBookmarkRepository.findAll().size();

        //when
        System.out.println("size = " + size);
        Exception e = Assertions.assertThrows(IllegalArgumentException.class,
                () -> myPageService.findOneBookMarkedCourse(member.getEmail(), size + 1L));

        //then
        Assertions.assertEquals(e.getMessage(), "NOT_EXIST_COURSE_BOOK_MARK");
    }


    private void createCourseBookMark(Member member, Course course) {
        CourseBookmark courseBookmark = CourseBookmark.of(member, course);
        courseBookmarkRepository.save(courseBookmark);
        member.addCourseBookMark(courseBookmark);
    }

    private Course createCourse(Member member) {
        Course course = Course.builder()
                .member(member)
                .title("testTitle")
                .content("testNickName")
                .region("testRegion")
                .isPublished(true)
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusDays(1))
                .build();
        return courseRepository.save(course);
    }

    private Member createUser(String email, String name) {
        Member member = Member.builder()
                .email(email)
                .nickName("testNick")
                .role(Role.NORMAL)
                .name(name).build();
        return memberRepository.save(member);
    }
}