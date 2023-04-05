package com.mohaeng.backend.member.service;

import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.domain.CourseBookmark;
import com.mohaeng.backend.course.repository.CourseBookmarkRepository;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.domain.Role;
import com.mohaeng.backend.member.dto.response.MyPageCourseBookMarkDto;
import com.mohaeng.backend.member.dto.response.MyPagePlaceBookMarkDto;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.domain.PlaceBookmark;
import com.mohaeng.backend.place.repository.PlaceBookmarkRepository;
import com.mohaeng.backend.place.repository.PlaceRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;


@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class MyPagePlaceBookMarkServiceTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private CourseBookmarkRepository courseBookmarkRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private MyPageService myPageService;
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private PlaceBookmarkRepository placeBookmarkRepository;


    @AfterEach
    public void end() {
        memberRepository.deleteAll();
    }


    @Test
    public void 장소_북마크_전체_조회() {
        //given
        Member member = createUser("kim@naver.com", "kim");
        Place place1 = createPlace(member);
        Place place2 = createPlace(member);
        createPlaceBookMark(member, place1);
        createPlaceBookMark(member, place2);

        //when
        List<MyPagePlaceBookMarkDto> allBookMarkedPlace = myPageService.findAllBookMarkedPlace(member.getEmail());

        //then
        Assertions.assertEquals(allBookMarkedPlace.size(), 2);
    }

    @Test
    public void 장소_북마크_단건_조회() {
        //given
        Member member = createUser("kim@naver.com", "kim");
        Place place = createPlace(member);
        createPlaceBookMark(member, place);
        long id = placeBookmarkRepository.findAll().size();

        //when
        MyPagePlaceBookMarkDto oneBookMarkedPlace = myPageService.findOneBookMarkedPlace(member.getEmail(), id);

        //then
        Assertions.assertEquals(oneBookMarkedPlace.getBookMarkId(), id);
        Assertions.assertEquals(oneBookMarkedPlace.getPlaceId(), place.getId());
        Assertions.assertEquals(oneBookMarkedPlace.getAddress(), place.getAddress());
    }

    @Test
    public void 장소_북마크_단건조회_잘못된_멤버_접근_예외_발생() {
        //given
        Member member = Member.builder()
                .email("kimmohaeng@naver.com")
                .nickName("testNick")
                .role(Role.NORMAL)
                .name("mohaeng").build();

        //when
        Exception e = Assertions.assertThrows(IllegalArgumentException.class, () -> {
            myPageService.findAllBookMarkedPlace(member.getEmail());
        });

        //then
        Assertions.assertEquals(e.getMessage(), "Not_Exist_Member");
    }

    @Test
    public void 존재하지_않는_장소_북마크_예외_발생() {
        //given
        Member member = createUser("kim@naver.com", "kim");
        long size = placeBookmarkRepository.findAll().size();

        //when
        Exception e = Assertions.assertThrows(IllegalArgumentException.class,
                () -> myPageService.findOneBookMarkedPlace(member.getEmail(), size + 1L));

        //then
        Assertions.assertEquals(e.getMessage(), "NOT_EXIST_PLACE_BOOK_MARK");
    }

    private void createPlaceBookMark(Member member, Place place) {
        PlaceBookmark placeBookmark = PlaceBookmark.of(member, place);
        placeBookmarkRepository.save(placeBookmark);
        member.addPlaceBookmark(placeBookmark);
    }

    private Place createPlace(Member member) {
        Place place = Place.builder()
                .address("testAdd")
                .member(member)
                .name("testName")
                .rating(2.5)
                .build();
        return placeRepository.save(place);
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