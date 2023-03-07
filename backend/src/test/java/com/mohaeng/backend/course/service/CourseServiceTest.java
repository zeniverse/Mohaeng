package com.mohaeng.backend.course.service;

import com.mohaeng.backend.course.dto.CoursePlaceSearchDto;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
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
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CourseServiceTest {
    @Autowired CourseService courseService;
    @Autowired PlaceRepository placeRepository;
    @Autowired PlaceImageRepository placeImageRepository;

    @BeforeEach
    public void before(){
        Place place1 = Place.builder()
                .id(1L)
                .name("경복궁")
                .address("서울시 종로구")
                .rating(4.5)
                .category(Category.place)
                .build();

        Place place2 = Place.builder()
                .id(2L)
                .name("부산 경복궁")
                .address("부산시 해운대구")
                .category(Category.RESTAURANT)
                .rating(4.5)
                .build();

        Place place3 = Place.builder()
                .id(3L)
                .name("경복")
                .address("서울시 강남구")
                .rating(5.0)
                .category(Category.place)
                .build();

        Place place4 = Place.builder()
                .id(4L)
                .name("경복궁 요리")
                .address("서울시 강동구")
                .rating(5.0)
                .category(Category.RESTAURANT)
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
    @DisplayName("장소 검색 - 필요한 정보를 모두 넣은 경우")
    public void placeSearchTest(){
        //Given
        CoursePlaceSearchReq req = new CoursePlaceSearchReq("경복", 4L, "5.0");

        //When
        CoursePlaceSearchRes res = courseService.placeSearch(req, PageRequest.ofSize(2));

        //Then
        List<CoursePlaceSearchDto> places = res.getPlaces();
//        System.out.println("places = " + places);

        assertNotNull(res);
        assertEquals(true, res.isHasNext());
        assertEquals(2, places.size());
        assertEquals("image/11111.jpg", places.get(0).getImgUrl());
    }

    @Test()
    @DisplayName("장소 검색 - 키워드를 넣지 않은 경우 에러 반환")
    public void placeSearchWithoutKeywordTest() throws Exception{
        //Given
        CoursePlaceSearchReq req = new CoursePlaceSearchReq(null, null, null);

        //When
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            courseService.placeSearch(req, PageRequest.ofSize(2));
        });

        //Then
        assertEquals(exception.getMessage(), "keyword 값이 비어있습니다.");
    }
}