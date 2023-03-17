package com.mohaeng.backend.course.controller;

import com.mohaeng.backend.config.SecurityConfig;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.course.service.CourseService;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = CourseController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
        })
class CourseControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private CourseService courseService;

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

}