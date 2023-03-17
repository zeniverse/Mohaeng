package com.mohaeng.backend.course.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohaeng.backend.config.SecurityConfig;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.request.CourseReq;
import com.mohaeng.backend.course.dto.response.CourseIdRes;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.course.service.CourseService;
import org.assertj.core.util.Lists;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = CourseController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
        })
class CourseControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private CourseService courseService;
    @Autowired private ObjectMapper objectMapper;

    @Test
    @DisplayName("[GET] 코스 장소 조회 - 정상 처리")
    @WithMockUser()
    public void course_placeSearch() throws Exception {
        //Given
        CoursePlaceSearchReq req = new CoursePlaceSearchReq("경복궁", 4L, "4.5");
        Pageable pageable = PageRequest.ofSize(3);

        // placeSearch에 CoursePlaceSearchReq 타입 어떤 값과 Pageable 타입의 어떤 값이 입력되면,
        // CoursePlaceSearchRes 타입 값을 return 한다
        given(courseService.placeSearch(any(CoursePlaceSearchReq.class), any(Pageable.class)))
                .willReturn(CoursePlaceSearchRes.from(new SliceImpl<>(List.of(), PageRequest.ofSize(3), false)));


        //When & Then
        mockMvc.perform(
                get("/api/course/placeSearch")
                        .queryParam("keyword", req.getKeyword())
                        .queryParam("lastPlaceId", String.valueOf(req.getLastPlaceId()))
                        .queryParam("lastRating", String.valueOf(req.getLastRating()))
                        .queryParam("size", String.valueOf(3)))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseService).placeSearch(refEq(req), eq(pageable));
    }

    @Test
    @WithMockUser
    @DisplayName("[GET] 코스 장소 조회 - keyword null 예외 발생")
    public void course_placeSearch_keyword_IsNull() throws Exception {
        CoursePlaceSearchReq req = new CoursePlaceSearchReq(null, null, null);
        Pageable pageable = PageRequest.ofSize(3);

        given(courseService.placeSearch(any(CoursePlaceSearchReq.class), any(Pageable.class)))
                .willThrow(new IllegalArgumentException("keyword 값이 비어있습니다."));

        //When & Then
        mockMvc.perform(
                        get("/api/course/placeSearch")
                                .queryParam("keyword", req.getKeyword())
                                .queryParam("lastPlaceId", String.valueOf(req.getLastPlaceId()))
                                .queryParam("lastRating", String.valueOf(req.getLastRating()))
                                .queryParam("size", String.valueOf(3)))
                .andExpect(status().is4xxClientError())
                .andDo(print());


        verify(courseService, times(0)).placeSearch(eq(req), eq(pageable));
    }

    @Test
    @DisplayName("[POST] 코스 생성 - 정상 처리")
    public void createCourse() throws Exception {
        CourseReq courseReq = CourseReq.builder()
                .title("나의 일정1")
                .courseDays("1박2일")
                .isPublished(false)
                .region("서울")
                .thumbnailUrl("images/01.jpg")
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusDays(1))
                .content("나의 첫번재 일정 입니다.")
                .placeIds(Lists.list(1L, 2L))
                .build();

        given(courseService.createCourse(any(CourseReq.class), anyString())).willReturn(CourseIdRes.from(1L));

        //When & Then
        mockMvc.perform(post("/api/course")
                        .with(oauth2Login()
                                // 1
                                .authorities(new SimpleGrantedAuthority("ROLE_NORMAL"))
                                // 2
                                .attributes(attributes -> {
                                    attributes.put("name", "kimMohaeng");
                                    attributes.put("email", "test@test.com");
                                })
                        )
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(courseReq))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseService).createCourse(refEq(courseReq), eq("test@test.com"));
    }

    @Test
    @DisplayName("[POST] 코스 생성 - 필수값을 넣지 않은 경우 예외 발생")
    public void createCourse_notNull_error() throws Exception {
        CourseReq courseReq = CourseReq.builder().build();

        given(courseService.createCourse(any(CourseReq.class), anyString()))
                .willThrow(new IllegalArgumentException());

        //When & Then
        mockMvc.perform(post("/api/course")
                        .with(oauth2Login()
                                // 1
                                .authorities(new SimpleGrantedAuthority("ROLE_NORMAL"))
                                // 2
                                .attributes(attributes -> {
                                    attributes.put("name", "kimMohaeng");
                                    attributes.put("email", "test@test.com");
                                })
                        )
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(courseReq))
                        .with(csrf()))
                .andExpect(
                        // assert로 예외를 검사하는 람다 사용
                        (res) -> assertEquals(
                                res.getResolvedException().getClass().getCanonicalName(),
                                MethodArgumentNotValidException.class.getCanonicalName()
                        )
                )
                .andExpect(status().isBadRequest())
                .andDo(print());

        verify(courseService, times(0)).createCourse(refEq(courseReq), eq("test@test.com"));
    }

}