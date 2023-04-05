package com.mohaeng.backend.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohaeng.backend.config.SecurityConfig;
import com.mohaeng.backend.exception.notfound.MemberNotFoundException;
import com.mohaeng.backend.exception.notfound.PlaceBookmarkNotFoundException;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.dto.response.MyPagePlaceBookMarkDto;
import com.mohaeng.backend.member.jwt.JwtFilter;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.service.MemberService;
import com.mohaeng.backend.member.service.MyPageService;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.domain.PlaceBookmark;
import org.junit.jupiter.api.Assertions;
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

import java.util.List;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
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
class MyPagePlaceBookMarkControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private TokenGenerator tokenGenerator;
    @MockBean
    private MemberService memberService;
    @MockBean
    private MyPageService myPageService;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser
    public void 장소_전체_조회_정상_처리() throws Exception {
        Member member = Member.builder().email("kim@naver.com").build();
        Place place = Place.builder().member(member).name("test").build();
        PlaceBookmark placeBookmark = PlaceBookmark.builder().place(place).member(member).build();

        given(myPageService.findAllBookMarkedPlace(any()))
                .willReturn(List.of(MyPagePlaceBookMarkDto.of(placeBookmark)));

        mockMvc.perform(get("/api/myPage/place/bookMark")
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
        Place place = Place.builder().member(member).name("test").build();
        PlaceBookmark placeBookmark = PlaceBookmark.builder().id(1L).place(place).member(member).build();

        given(myPageService.findOneBookMarkedPlace(any(), any()))
                .willReturn(MyPagePlaceBookMarkDto.of(placeBookmark));

        mockMvc.perform(get("/api/myPage/place/bookMark/{placeBookMarkId}", 1)
                        .header("Access-Token", anyString()))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$['data']['bookMarkId']").value(1L))
                .andExpect(jsonPath("$.result").value("ok"))
                .andReturn();
    }

    @Test
    @WithMockUser
    public void 존재하지_않는_장소_북마크_예외_처리() throws Exception {
        Member member = Member.builder().email("kim@naver.com").build();
        Place place = Place.builder().id(1L).member(member).name("test").build();
        PlaceBookmark placeBookmark = PlaceBookmark.builder().id(1L).place(place).member(member).build();

        given(myPageService.findOneBookMarkedPlace(any(), any()))
                .willThrow(new PlaceBookmarkNotFoundException());

        mockMvc.perform(get("/api/myPage/place/bookMark/{placeBookMarkId}", 3)
                        .header("Access-Token", anyString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(placeBookmark))
                        .with(csrf()))
                .andExpect(status().is4xxClientError())
                .andDo(print())
                .andExpect(
                        (result) -> Assertions.assertTrue(result.getResolvedException().getClass().
                                isAssignableFrom(PlaceBookmarkNotFoundException.class))
                )
                .andReturn();
    }

    @Test
    @WithMockUser
    public void 존재하지_멤버_장소_북마크_예외_처리() throws Exception {
        Member member = Member.builder().email("kim@naver.com").build();
        Place place = Place.builder().id(1L).member(member).name("test").build();
        PlaceBookmark placeBookmark = PlaceBookmark.builder().id(1L).place(place).member(member).build();

        given(myPageService.findOneBookMarkedPlace(any(), any()))
                .willThrow(new MemberNotFoundException());

        mockMvc.perform(get("/api/myPage/place/bookMark/{placeBookMarkId}", 3)
                        .header("Access-Token", anyString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(placeBookmark))
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