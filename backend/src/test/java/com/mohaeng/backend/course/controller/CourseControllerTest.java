package com.mohaeng.backend.course.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.request.CourseReq;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.domain.PlaceImage;

import com.mohaeng.backend.place.entity.Category;
import com.mohaeng.backend.place.repository.PlaceImageRepository;
import com.mohaeng.backend.place.repository.PlaceRepository;
import org.assertj.core.util.Lists;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDateTime;

import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class CourseControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private PlaceRepository placeRepository;
    @Autowired private PlaceImageRepository placeImageRepository;

    @BeforeEach
    public void before(){
        Place place1 = Place.builder()
                .id(1L)
                .name("경복궁")
                .addr1("서울시 종로구")
                .rating(4.5)
                .build();

        Place place2 = Place.builder()
                .id(2L)
                .name("부산 경복궁")
                .addr1("부산시 해운대구")
                .rating(4.5)
                .build();

        Place place3 = Place.builder()
                .id(3L)
                .name("경복")
                .addr1("서울시 강남구")
                .rating(5.0)
                .build();

        Place place4 = Place.builder()
                .id(4L)
                .name("경복궁 요리")
                .addr1("서울시 강동구")
                .rating(5.0)
                .build();

        placeRepository.saveAll(Lists.list(place1, place2, place3, place4));

        PlaceImage placeImage1 = PlaceImage.builder()
                .origin_name("image_01.jpg")
                .name("001234231")
                .imgUrl("image/0.jpg")
                .place(place1)
                .build();

        PlaceImage placeImage2 = PlaceImage.builder()
                .origin_name("image_02.jpg")
                .name("00")
                .imgUrl("image/00.jpg")
                .place(place1)
                .build();

        PlaceImage placeImage3 = PlaceImage.builder()
                .origin_name("image_03.jpg")
                .name("1121")
                .imgUrl("image/1121.jpg")
                .place(place2)
                .build();

        PlaceImage placeImage4 = PlaceImage.builder()
                .origin_name("image_04.jpg")
                .name("11111")
                .imgUrl("image/11111.jpg")
                .place(place3)
                .build();

        PlaceImage placeImage5 = PlaceImage.builder()
                .origin_name("image_05.jpg")
                .name("222")
                .imgUrl("image/222.jpg")
                .place(place4)
                .build();

        placeImageRepository.saveAll(
                Lists.list(placeImage1, placeImage2, placeImage3, placeImage4, placeImage5));
    }

    @AfterEach
    void afterEach() {
        placeRepository.deleteAll();
        placeImageRepository.deleteAll();
    }

    @Test
    @DisplayName("/placeSearch 요청 - 정상 처리")
    public void course_placeSearch() throws Exception {
        //Given
        CoursePlaceSearchReq req = new CoursePlaceSearchReq("경복궁", 4L, "4.5");

        //When & Then
        mockMvc.perform(
                get("/api/course/placeSearch")
                        .queryParam("keyword", req.getKeyword())
                        .queryParam("lastPlaceId", String.valueOf(req.getLastPlaceId()))
                        .queryParam("lastRating", String.valueOf(req.getLastRating()))
                        .queryParam("size", String.valueOf(3)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.hasNext").value(false))
                .andExpect(jsonPath("$.data.places.length()",is(2)))
                .andExpect(jsonPath("$.data.places[1].imgUrl").value("image/0.jpg"))
                .andDo(print());

    }

    @Test
    @DisplayName("/placeSearch 요청 - keyword null 에러 발생")
    public void course_placeSearch_keyword_IsNull() throws Exception {
        //Given
        CoursePlaceSearchReq req = new CoursePlaceSearchReq(null, null, null);

        //When & Then
        mockMvc.perform(
                        get("/api/course/placeSearch")
                                .queryParam("keyword", req.getKeyword())
                                .queryParam("lastPlaceId", String.valueOf(req.getLastPlaceId()))
                                .queryParam("lastRating", String.valueOf(req.getLastRating()))
                                .queryParam("size", String.valueOf(3)))
                .andExpect(status().is4xxClientError())
                .andDo(print());

    }

}