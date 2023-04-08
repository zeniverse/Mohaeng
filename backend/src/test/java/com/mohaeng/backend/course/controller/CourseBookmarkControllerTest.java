package com.mohaeng.backend.course.controller;

import com.mohaeng.backend.config.SecurityConfig;
import com.mohaeng.backend.course.dto.response.CourseBookmarkRes;
import com.mohaeng.backend.course.service.CourseBookmarkService;
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
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = CourseBookmarkController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
        })
class CourseBookmarkControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean private CourseBookmarkService courseBookmarkService;
    @MockBean private TokenGenerator tokenGenerator;
    @MockBean private MemberRepository memberRepository;

    @Test
    @DisplayName("[POST] 코스 북마크 - 정상 처리")
    @WithMockUser
    public void addCourseBookmark() throws Exception {
        //Given
        given(courseBookmarkService.addBookmark(anyLong(), anyString()))
                .willReturn(CourseBookmarkRes.from(1L, 1L));
        Long courseId = 100L;

        //When & Then
        mockMvc.perform(post("/api/course/bookmark/{courseId}", courseId)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseBookmarkService).addBookmark(eq(courseId), any());
    }

    @Test
    @DisplayName("[POST] 코스 북마크 - 로그인한 유저가 아닐 경우")
    @WithAnonymousUser
    public void addCourseBookmark_noMember() throws Exception {
        //Given
        given(courseBookmarkService.addBookmark(anyLong(), anyString()))
                .willThrow(new MemberNotFoundException());

        //When & Then
        mockMvc.perform(post("/api/course/bookmark/")
                        .with(csrf()))
                .andExpect(status().is3xxRedirection())
                .andDo(print());

        verify(courseBookmarkService, times(0)).addBookmark(anyLong(), any());
    }

    @Test
    @DisplayName("[POST] 코스 북마크 - 코스가 존재하지 않는 경우")
    @WithMockUser
    public void addCourseBookmark_noCourse() throws Exception {
        //Given
        given(courseBookmarkService.addBookmark(nullable(Long.class), anyString()))
                .willThrow(new CourseNotFoundException());

        //When & Then
        mockMvc.perform(post("/api/course/bookmark/")
                        .with(csrf()))
                .andExpect(status().isNotFound())
                .andDo(print());

        verify(courseBookmarkService, times(0)).addBookmark(anyLong(), any());
    }

    @Test
    @DisplayName("[DELETE] 코스 북마크 취소 - 정상 처리")
    @WithMockUser
    public void cancelCourseBookmark() throws Exception {
        //Given
        doNothing().when(courseBookmarkService).cancelBookmark(anyLong(), anyString());

        //When & Then
        mockMvc.perform(delete("/api/course/bookmark/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseBookmarkService).cancelBookmark(anyLong(), any());
    }


    @Test
    @DisplayName("[DELETE] 코스 북마크 취소 - 로그인한 유저가 아닐 경우")
    @WithAnonymousUser
    public void cancelCourseBookmark_noMember() throws Exception {
        //Given
        //When & Then
        mockMvc.perform(delete("/api/course/bookmark/")
                        .with(csrf()))
                .andExpect(status().is3xxRedirection())
                .andDo(print());

        verify(courseBookmarkService, times(0)).cancelBookmark(anyLong(), any());
    }

    @Test
    @DisplayName("[DELETE] 코스 북마크 취소 - 코스가 존재하지 않는 경우")
    @WithMockUser
    public void cancelCourseBookmark_noCourse() throws Exception {
        //Given
        //When & Then
        mockMvc.perform(delete("/api/course/bookmark/")
                        .with(csrf()))
                .andExpect(status().isNotFound())
                .andDo(print());

        verify(courseBookmarkService, times(0)).cancelBookmark(anyLong(), any());
    }

    @Test
    @DisplayName("[GET] 코스 북마크 유무 - 정상 처리")
    @WithMockUser
    public void existsCourseBookmark() throws Exception {
        //Given
        Long courseId = 1L;
        given(courseBookmarkService.isExistCourseBookmark(anyLong(), anyString())).willReturn(false);

        //When & Then
        mockMvc.perform(get("/api/course/bookmark/{courseId}", courseId))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseBookmarkService).isExistCourseBookmark(eq(courseId), any());
    }

    @Test
    @DisplayName("[GET] 코스 북마크 유무 - 로그인한 유저가 아닐 경우")
    @WithAnonymousUser
    public void existsCourseBookmark_noMember() throws Exception {
        //Given
        given(courseBookmarkService.isExistCourseBookmark(anyLong(), anyString()))
                .willThrow(new MemberNotFoundException());

        //When & Then
        mockMvc.perform(get("/api/course/bookmark/"))
                .andExpect(status().is3xxRedirection())
                .andDo(print());

        verify(courseBookmarkService, times(0)).isExistCourseBookmark(anyLong(), any());
    }

}
