package com.mohaeng.backend.place.controller;

import com.mohaeng.backend.config.SecurityConfig;
import com.mohaeng.backend.course.dto.response.CourseBookmarkRes;
import com.mohaeng.backend.course.dto.response.CourseLikesRes;
import com.mohaeng.backend.course.service.CourseBookmarkService;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.place.dto.response.PlaceBookmarkResponse;
import com.mohaeng.backend.place.service.PlaceBookmarkService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PlaceBookmarkController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
        })
public class BookmarkControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private PlaceBookmarkService placeBookmarkService;
    @MockBean private TokenGenerator tokenGenerator;
    @MockBean private MemberRepository memberRepository;

    @Test
    @DisplayName("[POST] 장소 북마크 - 정상 처리")
    @WithMockUser
    public void addPlaceBookmark() throws Exception {
        //Given
        given(placeBookmarkService.addBookmark(anyLong(), anyString()))
                .willReturn(PlaceBookmarkResponse.from(1L, 1L));
        Long placeId = 100L;

        //When & Then
        mockMvc.perform(post("/api/place/bookmark/{placeId}", placeId)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());

        verify(placeBookmarkService).addBookmark(eq(placeId), any());
    }

    @Test
    @DisplayName("[DELETE] 장소 북마크 취소 - 정상 처리")
    @WithMockUser
    public void cancelPlaceBookmark() throws Exception {
        //Given
        given(placeBookmarkService.cancelBookmark(anyLong(), anyString()))
                .willReturn(PlaceBookmarkResponse.from(1L, 1L));
        Long placeId = 100L;

        //When & Then
        mockMvc.perform(delete("/api/place/bookmark/{placeId}", placeId)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());

        verify(placeBookmarkService).cancelBookmark(eq(placeId), any());
    }

    @Test
    @DisplayName("[GET] 장소 북마크 유무 - 정상 처리")
    @WithMockUser
    public void existsPlaceBookmark() throws Exception {
        //Given
        Long placeId = 1L;
        given(placeBookmarkService.isExistPlaceBookmark(anyLong(), anyString())).willReturn(false);

        //When & Then
        mockMvc.perform(get("/api/place/bookmark/{placeId}", placeId))
                .andExpect(status().isOk())
                .andDo(print());

        verify(placeBookmarkService).isExistPlaceBookmark(eq(placeId), any());
    }

}