package com.mohaeng.backend.course.controller;

import com.mohaeng.backend.config.SecurityConfig;
import com.mohaeng.backend.course.dto.response.CourseLikesRes;
import com.mohaeng.backend.course.service.CourseLikesService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = CourseLikesController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
        })
class CourseLikesControllerTest {

//    @Autowired
//    private MockMvc mockMvc;
//    @MockBean private CourseLikesService courseLikesService;
//
//
//    @Test
//    @DisplayName("[POST] 코스 좋아요 - 정상 처리")
//    @WithMockUser
//    public void addCourseLikes() throws Exception {
//        //Given
//        given(courseLikesService.addLikes(anyLong(), anyString()))
//                .willReturn(CourseLikesRes.from(1L, 1L));
//        Long courseId = 100L;
//
//        //When & Then
//        mockMvc.perform(post("/api/course/likes/{courseId}", courseId)
//                        .with(oauth2Login()
//                                // 1
//                                .authorities(new SimpleGrantedAuthority("ROLE_NORMAL"))
//                                // 2
//                                .attributes(attributes -> {
//                                    attributes.put("name", "kimMohaeng");
//                                    attributes.put("email", "test@test.com");
//                                })
//                        )
//                        .with(csrf()))
//                .andExpect(status().isOk())
//                .andDo(print());
//
//        verify(courseLikesService).addLikes(eq(courseId), eq("test@test.com"));
//    }
//
//    @Test
//    @DisplayName("[DELETE] 코스 좋아요 취소 - 정상 처리")
//    @WithMockUser
//    public void cancelCourseLikes() throws Exception {
//        //Given
//        given(courseLikesService.cancelLikes(anyLong(), anyString()))
//                .willReturn(CourseLikesRes.from(1L, 1L));
//        Long courseId = 100L;
//
//        //When & Then
//        mockMvc.perform(delete("/api/course/likes/{courseId}", courseId)
//                        .with(oauth2Login()
//                                // 1
//                                .authorities(new SimpleGrantedAuthority("ROLE_NORMAL"))
//                                // 2
//                                .attributes(attributes -> {
//                                    attributes.put("name", "kimMohaeng");
//                                    attributes.put("email", "test@test.com");
//                                })
//                        )
//                        .with(csrf()))
//                .andExpect(status().isOk())
//                .andDo(print());
//
//        verify(courseLikesService).cancelLikes(eq(courseId), eq("test@test.com"));
//    }
//
//    @Test
//    @DisplayName("[GET] 코스 좋아요 유무 - 정상 처리")
//    @WithMockUser
//    public void existsCourseLikes() throws Exception {
//        //Given
//        Long courseId = 1L;
//        given(courseLikesService.isExistCourseLikes(anyLong(), anyString())).willReturn(false);
//
//        //When & Then
//        mockMvc.perform(get("/api/course/likes/{courseId}", courseId)
//                        .with(oauth2Login()
//                                // 1
//                                .authorities(new SimpleGrantedAuthority("ROLE_NORMAL"))
//                                // 2
//                                .attributes(attributes -> {
//                                    attributes.put("name", "kimMohaeng");
//                                    attributes.put("email", "test@test.com");
//                                })
//                        ))
//                .andExpect(status().isOk())
//                .andDo(print());
//
//        verify(courseLikesService).isExistCourseLikes(eq(courseId), eq("test@test.com"));
//    }
//
//    @Test
//    @DisplayName("[GET] 코스 좋아요 count - 정상 처리")
//    @WithMockUser
//    public void countCourseLikes() throws Exception {
//        //Given
//        Long courseId = 1L;
//        given(courseLikesService.countLikes(anyLong()))
//                .willReturn(CourseLikesRes.from(1L, 1L));
//
//        //When & Then
//        mockMvc.perform(get("/api/course/likes/count/{courseId}", courseId))
//                .andExpect(status().isOk())
//                .andDo(print());
//
//        verify(courseLikesService).countLikes(eq(courseId));
//    }
//
//
//
//    //TODO: exceptionHandler 구현 후, 처리할 case
//
//    // 코스 좋아요 - 로그인한 유저가 아닐 경우
//    // 코스 좋아요 - 코스가 존재하지 않는 경우
//    // 코스 좋아요 - 이미 좋아요를 누른 경우
//
//    // 코스 좋아요 취소 - 로그인한 유저가 아닐 경우
//    // 코스 좋아요 취소 - 코스가 존재하지 않는 경우
//    // 코스 좋아요 취소 - 좋아요를 누르지 않은 경우
//
//    // 코스 좋아요 유무 - 로그인 되어있지 않을 때
//
//    // 코스 좋아요 갯수 조회 - 코스가 존재하지 않는 경우
}