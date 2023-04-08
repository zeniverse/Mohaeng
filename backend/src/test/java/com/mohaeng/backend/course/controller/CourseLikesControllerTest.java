package com.mohaeng.backend.course.controller;

import com.mohaeng.backend.config.SecurityConfig;
import com.mohaeng.backend.course.dto.response.CourseLikesRes;
import com.mohaeng.backend.course.service.CourseLikesService;
import com.mohaeng.backend.exception.notfound.CourseNotFoundException;
import com.mohaeng.backend.exception.notfound.MemberNotFoundException;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = CourseLikesController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
        })
class CourseLikesControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean private CourseLikesService courseLikesService;
    @MockBean private TokenGenerator tokenGenerator;
    @MockBean private MemberRepository memberRepository;

    @Test
    @DisplayName("[POST] 코스 좋아요 - 정상 처리")
    @WithMockUser
    public void addCourseLikes() throws Exception {
        //Given
        given(courseLikesService.addLikes(anyLong(), anyString()))
                .willReturn(CourseLikesRes.from(1L, 1L));
        Long courseId = 100L;

        //When & Then
        mockMvc.perform(post("/api/course/likes/{courseId}", courseId)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseLikesService).addLikes(eq(courseId), any());
    }

    @Test
    @DisplayName("[POST] 코스 좋아요 - 로그인한 유저가 아닐 경우")
    @WithAnonymousUser
    public void addCourseLikes_noMember() throws Exception {
        //Given
        given(courseLikesService.addLikes(anyLong(), anyString()))
                .willThrow(new MemberNotFoundException());

        //When & Then
        mockMvc.perform(post("/api/course/likes")
                        .with(csrf()))
                .andExpect(status().is3xxRedirection())
                .andDo(print());

        verify(courseLikesService, times(0)).addLikes(anyLong(), any());
    }

    @Test
    @DisplayName("[POST] 코스 좋아요 - 코스가 존재하지 않는 경우")
    @WithMockUser
    public void addCourseLikes_noCourse() throws Exception {
        //Given
        given(courseLikesService.addLikes(nullable(Long.class), anyString()))
                .willThrow(new CourseNotFoundException());

        //When & Then
        mockMvc.perform(delete("/api/course/likes")
                        .with(csrf()))
                .andExpect(status().isNotFound())
                .andDo(print());

        verify(courseLikesService, times(0)).addLikes(anyLong(), any());
    }


    @Test
    @DisplayName("[DELETE] 코스 좋아요 취소 - 정상 처리")
    @WithMockUser
    public void cancelCourseLikes() throws Exception {
        //Given
        given(courseLikesService.cancelLikes(anyLong(), anyString()))
                .willReturn(CourseLikesRes.from(1L, 1L));
        Long courseId = 100L;

        //When & Then
        mockMvc.perform(delete("/api/course/likes/{courseId}", courseId)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseLikesService).cancelLikes(eq(courseId), any());
    }


    @Test
    @DisplayName("[DELETE] 코스 좋아요 취소 - 로그인한 유저가 아닐 경우")
    @WithAnonymousUser
    public void cancelCourseLikes_noMember() throws Exception {
        //Given
        given(courseLikesService.cancelLikes(anyLong(), anyString()))
                .willThrow(new MemberNotFoundException());

        //When & Then
        mockMvc.perform(delete("/api/course/likes")
                        .with(csrf()))
                .andExpect(status().is3xxRedirection())
                .andDo(print());

        verify(courseLikesService, times(0)).cancelLikes(anyLong(), any());
    }

    @Test
    @DisplayName("[DELETE] 코스 좋아요 취소 - 코스가 존재하지 않는 경우")
    @WithMockUser
    public void cancelCourseLikes_noCourse() throws Exception {
        //Given
        given(courseLikesService.cancelLikes(nullable(Long.class), anyString()))
                .willThrow(new CourseNotFoundException());

        //When & Then
        mockMvc.perform(delete("/api/course/likes")
                        .with(csrf()))
                .andExpect(status().isNotFound())
                .andDo(print());

        verify(courseLikesService, times(0)).cancelLikes(anyLong(), any());
    }


    @Test
    @DisplayName("[GET] 코스 좋아요 유무 - 정상 처리")
    @WithMockUser
    public void existsCourseLikes() throws Exception {
        //Given
        Long courseId = 1L;
        given(courseLikesService.isExistCourseLikes(anyLong(), anyString())).willReturn(false);

        //When & Then
        mockMvc.perform(get("/api/course/likes/{courseId}", courseId))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseLikesService).isExistCourseLikes(eq(courseId), any());
    }

    @Test
    @DisplayName("[GET] 코스 좋아요 유무 - 로그인한 유저가 아닐 경우")
    @WithAnonymousUser
    public void existsCourseLikes_noMember() throws Exception {
        //Given
        given(courseLikesService.isExistCourseLikes(anyLong(), anyString()))
                .willThrow(new MemberNotFoundException());

        //When & Then
        mockMvc.perform(get("/api/course/likes"))
                .andExpect(status().is3xxRedirection())
                .andDo(print());

        verify(courseLikesService, times(0)).isExistCourseLikes(anyLong(), any());
    }

    @Test
    @DisplayName("[GET] 코스 좋아요 count - 정상 처리")
    @WithMockUser
    public void countCourseLikes() throws Exception {
        //Given
        Long courseId = 1L;
        given(courseLikesService.countLikes(anyLong()))
                .willReturn(CourseLikesRes.from(1L, 1L));

        //When & Then
        mockMvc.perform(get("/api/course/likes/count/{courseId}", courseId))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseLikesService).countLikes(eq(courseId));
    }

    @Test
    @DisplayName("[GET] 코스 좋아요 count - 코스가 존재하지 않는 경우")
    @WithMockUser
    public void countCourseLikes_noCourse() throws Exception {
        //Given
        given(courseLikesService.countLikes(nullable(Long.class))).willThrow(new CourseNotFoundException());

        //When & Then
        mockMvc.perform(get("/api/course/likes/count/"))
                .andExpect(status().isNotFound())
                .andDo(print());

        verify(courseLikesService, times(0)).countLikes(anyLong());
    }
}
