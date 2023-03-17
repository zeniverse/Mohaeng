package com.mohaeng.backend.course.service;

import com.mohaeng.backend.course.dto.CoursePlaceSearchDto;
import com.mohaeng.backend.course.dto.request.CoursePlaceSearchReq;
import com.mohaeng.backend.course.dto.response.CoursePlaceSearchRes;
import com.mohaeng.backend.course.repository.CourseRepository;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.domain.PlaceImage;
import com.mohaeng.backend.place.repository.PlaceImageRepository;
import com.mohaeng.backend.place.repository.PlaceRepository;
import org.assertj.core.util.Lists;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CourseServiceTest {
    @Autowired CourseService courseService;
    @Autowired PlaceRepository placeRepository;
    @Autowired PlaceImageRepository placeImageRepository;
    @Autowired CourseRepository courseRepository;
    @Autowired MemberRepository memberRepository;

    @BeforeAll
    public void before(){
        Place place1 = Place.builder()
                .name("경복궁")
                .addr1("서울시 종로구")
                .rating(4.5)
                .build();

        Place place2 = Place.builder()
                .name("부산 경복궁")
                .addr1("부산시 해운대구")
                .rating(4.5)
                .build();

        Place place3 = Place.builder()
                .name("경복")
                .addr1("서울시 강남구")
                .rating(5.0)
                .build();

        Place place4 = Place.builder()
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
        memberRepository.deleteAll();
    }

    @Test
    @DisplayName("장소 검색 - 정상 처리")
    public void placeSearchTest(){
        //Given
        List<Place> placeList = placeRepository.findAll();
        CoursePlaceSearchReq req = new CoursePlaceSearchReq("경복", placeList.get(3).getId(), "5.0");

        //When
        CoursePlaceSearchRes res = courseService.placeSearch(req, PageRequest.ofSize(2));

        //Then
        List<CoursePlaceSearchDto> places = res.getPlaces();
        System.out.println("places = " + places);
        List<Place> all = placeRepository.findAll();
        for (Place place : all) {
            System.out.println("place = " + place);
        }

        assertNotNull(res);
        assertEquals(true, res.isHasNext());
        assertEquals(2, places.size());
        assertEquals("image/11111.jpg", places.get(0).getImgUrl());
    }

    @Test()
    @DisplayName("장소 검색 - 키워드를 넣지 않은 경우 예외 처리")
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


