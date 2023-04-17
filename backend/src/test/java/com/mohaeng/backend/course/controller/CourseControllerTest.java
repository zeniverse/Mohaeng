package com.mohaeng.backend.course.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohaeng.backend.config.SecurityConfig;
import com.mohaeng.backend.course.domain.Course;
import com.mohaeng.backend.course.domain.CourseStatus;
import com.mohaeng.backend.course.dto.CourseInPlaceDto;
import com.mohaeng.backend.course.dto.CourseListDto;
import com.mohaeng.backend.course.dto.CourseSearchDto;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.request.CourseReq;
import com.mohaeng.backend.course.dto.request.CourseUpdateReq;
import com.mohaeng.backend.course.dto.response.CourseIdRes;
import com.mohaeng.backend.course.dto.response.CourseListRes;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.course.dto.response.CourseRes;
import com.mohaeng.backend.course.service.CourseService;
import com.mohaeng.backend.exception.badrequest.InvalidKeywordPlaceInCourse;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.repository.MemberRepository;
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
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.BDDMockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = CourseController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
        })
class CourseControllerTest {

    @MockBean private TokenGenerator tokenGenerator;
    @MockBean private MemberRepository memberRepository;
    @Autowired private MockMvc mockMvc;
    @MockBean private CourseService courseService;
    @Autowired private ObjectMapper objectMapper;

    @Test
    @WithMockUser
    @DisplayName("[GET] 코스 장소 조회 - 정상 처리")
    public void course_placeSearch() throws Exception {
        //Given
        CoursePlaceSearchReq req = new CoursePlaceSearchReq("경복궁", 4L, "4.5");
        Pageable pageable = PageRequest.ofSize(5);;

        // placeSearch에 CoursePlaceSearchReq 타입 어떤 값과 Pageable 타입의 어떤 값이 입력되면,
        // CoursePlaceSearchRes 타입 값을 return 한다
        given(courseService.placeSearch(any(CoursePlaceSearchReq.class), any(Pageable.class)))
                .willReturn(CoursePlaceSearchRes.from(false, List.of()));


        //When & Then
        mockMvc.perform(
                        get("/api/course/placeSearch")
                                .queryParam("keyword", req.getKeyword())
                                .queryParam("lastId", String.valueOf(req.getLastId()))
                                .queryParam("lastRating", String.valueOf(req.getLastRating()))
                                .queryParam("size", String.valueOf(5)))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseService).placeSearch(refEq(req), eq(pageable));
    }

    @Test
    @WithMockUser
    @DisplayName("[GET] 코스 장소 조회 - keyword null 예외 발생")
    public void course_placeSearch_keyword_IsNull() throws Exception {
        CoursePlaceSearchReq req = new CoursePlaceSearchReq(null, null, null);
        Pageable pageable = PageRequest.ofSize(5);

        given(courseService.placeSearch(any(CoursePlaceSearchReq.class), any(Pageable.class)))
                .willThrow(new InvalidKeywordPlaceInCourse());

        //When & Then
        mockMvc.perform(
                        get("/api/course/placeSearch")
                                .queryParam("keyword", req.getKeyword())
                                .queryParam("lastPlaceId", String.valueOf(req.getLastId()))
                                .queryParam("lastRating", String.valueOf(req.getLastRating()))
                                .queryParam("size", String.valueOf(5)))
                .andExpect(status().isBadRequest())
                .andDo(print());


        verify(courseService, times(0)).placeSearch(eq(req), eq(pageable));
    }

    @Test
    @WithMockUser
    @DisplayName("[POST] 코스 생성 - 정상 처리")
    public void createCourse() throws Exception {
        CourseReq courseReq = CourseReq.builder()
                .title("나의 일정1")
                .courseDays("1박2일")
                .isPublished(false)
                .region("서울")
                .thumbnailUrl("images/01.jpg")
                .startDate("2023-03-30")
                .endDate("2023-03-31")
                .content("나의 첫번재 일정 입니다.")
                .placeIds(Lists.list(1L, 2L))
                .build();

        given(courseService.createCourse(any(CourseReq.class), anyString())).willReturn(CourseIdRes.from(1L));

        //When & Then
        mockMvc.perform(post("/api/course")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(courseReq))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseService).createCourse(refEq(courseReq), any());
    }

    @Test
    @WithMockUser
    @DisplayName("[POST] 코스 생성 - 필수값을 넣지 않은 경우 예외 발생")
    public void createCourse_notNull_error() throws Exception {
        CourseReq courseReq = CourseReq.builder().build();

//        given(courseService.createCourse(any(CourseReq.class), anyString()))
//                .willThrow(new IllegalArgumentException());

        //When & Then
        mockMvc.perform(post("/api/course")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(courseReq))
                        .with(csrf()))
                .andExpect(status().isBadRequest())
                .andDo(print());

        verify(courseService, times(0)).createCourse(refEq(courseReq), any());
    }

    @Test
    @DisplayName("[GET] 코스 단건 조회 - 정상 처리")
    @WithMockUser()
    public void getCourse() throws Exception {
        //Given
        given(courseService.getCourse(anyLong(), anyString()))
                .willReturn(CourseRes.from(createTestCourse(), List.of(createCourseInPlaceDTO()), true, false));

        //When & Then
        mockMvc.perform(get("/api/course/1"))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseService).getCourse(any(), any());
    }

    @Test
    @WithMockUser
    @DisplayName("[PUT] 코스 수정 - 정상 처리")
    public void updateCourse() throws Exception {
        //Given
        CourseUpdateReq updateReq = CourseUpdateReq.builder()
                .title("수정된 코스 제목")
                .courseDays("1박2일")
                .isPublished(false)
                .region("서울")
                .thumbnailUrl("images/01.jpg")
                .startDate("2023-03-30")
                .endDate("2023-03-31")
                .content("나의 첫번재 일정 입니다.")
                .placeIds(Lists.list(1L, 2L))
                .build();

        Long courseId = 1L;

        given(courseService.updateCourse(anyString(), anyLong(), any(CourseUpdateReq.class)))
                .willReturn(CourseIdRes.from(1L));

        //When & Then
        mockMvc.perform(put("/api/course/{courseId}", courseId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(updateReq))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseService).updateCourse(any(), eq(courseId), refEq(updateReq));
    }

    @Test
    @WithMockUser
    @DisplayName("[DELETE] 코스 삭제 - 정상 처리")
    public void deleteCourse() throws Exception {
        //Given
        doNothing().when(courseService).deleteCourse(anyString(), anyLong());
        Long courseId = 1L;

        //When & Then
        mockMvc.perform(delete("/api/course/{courseId}", courseId)
                        .header("Access-Token", "Bearer aaaaaaaa.bbbbbbbb.cccccccc")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseService).deleteCourse(any(), eq(courseId));
    }

    @Test
    @DisplayName("[GET] 코스 검색 - 정상 처리")
    @WithMockUser
    public void searchCourse() throws Exception {
        //Given
        CourseListDto courseListDto = CourseListDto.builder()
                .title("코스입니다").build();
        Long totalElements = 2L;
        Integer totalPages = 1;

        CourseSearchDto courseSearchDto = CourseSearchDto.builder()
                .keyword("코스")
                .build();
        given(courseService.getCourseList(any(CourseSearchDto.class), any(PageRequest.class), anyString()))
                .willReturn(CourseListRes.from(List.of(courseListDto), totalElements, totalPages));

        //When & Then
        mockMvc.perform(
                        get("/api/course")
                                .queryParam("keyword", courseSearchDto.getKeyword())
                                .queryParam("page", String.valueOf(1))
                                .queryParam("size", String.valueOf(2)))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseService).getCourseList(refEq(courseSearchDto),
                eq(PageRequest.of(0, 2)), any());
    }

    @Test
    @DisplayName("[GET] 메인 코스 조회 - 정상 처리")
    @WithMockUser
    public void mainCourse() throws Exception {
        //Given
        given(courseService.getMainCourse(any())).willReturn(List.of());

        //When & Then
        mockMvc.perform(
                        get("/api/course/main"))
                .andExpect(status().isOk())
                .andDo(print());

        verify(courseService).getMainCourse(any());
    }

    private CourseInPlaceDto createCourseInPlaceDTO() {
        return CourseInPlaceDto.builder()
                .name("test name")
                .imgUrl("image/01.jpg")
                .address("서울시,,")
                .placeId(1L)
                .mapX("좌표x")
                .mapY("좌표y")
                .build();
    }

    private Course createTestCourse() {
        return Course.builder()
                .title("Course Test Title")
                .courseDays("1박2일")
                .courseStatus(CourseStatus.PUBLIC)
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusDays(1))
                .region("서울")
                .member(Member.builder().nickName("nickName").build())
                .content("내용입니다")
                .likeCount(0)
                .build();
    }
}