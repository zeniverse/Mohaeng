package com.mohaeng.backend.member.controller;

import com.mohaeng.backend.config.SecurityConfig;
import com.mohaeng.backend.course.controller.CourseLikesController;
import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.domain.CourseBookmark;
import com.mohaeng.backend.course.repository.CourseBookmarkRepository;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.exception.notfound.CourseBookmarkNotFoundException;
import com.mohaeng.backend.exception.notfound.CourseNotFoundException;
import com.mohaeng.backend.exception.notfound.MemberNotFoundException;
import com.mohaeng.backend.exception.notfound.PlaceBookmarkNotFoundException;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.domain.Role;
import com.mohaeng.backend.member.dto.response.MyPageCourseBookMarkDto;
import com.mohaeng.backend.member.jwt.JwtFilter;
import com.mohaeng.backend.member.jwt.Token;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.member.service.MemberService;
import com.mohaeng.backend.member.service.MyPageService;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.domain.PlaceBookmark;
import com.nimbusds.jose.shaded.gson.Gson;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;

import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(controllers = MyPageController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class),
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = JwtFilter.class)
        })
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class MyPageCourseBookMarkControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private TokenGenerator tokenGenerator;
    @MockBean
    private MemberService memberService;
    @MockBean
    private MyPageService myPageService;

//    @BeforeAll
//    public void setUp() {
//        Member member = Member.builder()
//                .email("kim@naver.com")
//                .nickName("testNick")
//                .role(Role.NORMAL)
//                .name("kim").build();
//        memberService.saveMember(member);
//    }

    @Test
    @WithMockUser
    public void 코스_전체조회_정상_처리() throws Exception {
        Member member = Member.builder().email("kim@naver.com").build();
        Course course = Course.builder().member(member).title("test").build();
        CourseBookmark courseBookmark = CourseBookmark.builder().course(course).member(member).build();

        given(myPageService.findAllBookMarkCourse(any()))
                .willReturn(List.of(MyPageCourseBookMarkDto.of(courseBookmark)));

        mockMvc.perform(get("/api/myPage/course/bookMark")
                        .header("Access-Token", anyString()))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.data.length()").value(greaterThanOrEqualTo(1)))
                .andExpect(jsonPath("$.result").value("ok"))
                .andReturn();
    }

    @Test
    @WithMockUser
    public void 코스_단건_조회_정상_처리() throws Exception {
        Member member = Member.builder().email("kim@naver.com").build();
        Course course = Course.builder().member(member).title("test").build();
        CourseBookmark courseBookmark = CourseBookmark.builder().id(1L).course(course).member(member).build();

        given(myPageService.findOneBookMarkedCourse(any(), any()))
                .willReturn(MyPageCourseBookMarkDto.of(courseBookmark));

        mockMvc.perform(get("/api/myPage/course/bookMark/{courseLikeId}", 1)
                        .header("Access-Token", anyString()))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$['data']['bookMarkId']").value(1L))
                .andExpect(jsonPath("$.result").value("OK"))
                .andReturn();
    }

    @Test
    @WithMockUser
    public void 존재하지_않는_코스_북마크_예외_처리() throws Exception {
        Member member = Member.builder().email("kim@naver.com").build();
        Course course = Course.builder().member(member).title("test").build();
        CourseBookmark courseBookmark = CourseBookmark.builder().id(1L).course(course).member(member).build();

        given(myPageService.findOneBookMarkedPlace(any(), any()))
                .willThrow(new CourseBookmarkNotFoundException());

        mockMvc.perform(get("/api/myPage/place/bookMark/{placeBookMarkId}", 3)
                        .header("Access-Token", anyString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().is4xxClientError())
                .andDo(print())
                .andExpect(
                        (result) -> Assertions.assertTrue(result.getResolvedException().getClass().
                                isAssignableFrom(CourseBookmarkNotFoundException.class))
                )
                .andReturn();
    }

    @Test
    @WithMockUser
    public void 존재하지_멤버_코스_북마크_예외_처리() throws Exception {
        Member member = Member.builder().email("kim@naver.com").build();
        Course course = Course.builder().member(member).title("test").build();
        CourseBookmark courseBookmark = CourseBookmark.builder().id(1L).course(course).member(member).build();

        given(myPageService.findOneBookMarkedPlace(any(), any()))
                .willThrow(new MemberNotFoundException());

        mockMvc.perform(get("/api/myPage/place/bookMark/{placeBookMarkId}", 3)
                        .header("Access-Token", anyString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()))
                .andExpect(status().is4xxClientError())
                .andDo(print())
                .andExpect(
                        (result) -> Assertions.assertTrue(result.getResolvedException().getClass().
                                isAssignableFrom(MemberNotFoundException.class))
                )
                .andReturn();
    }

}