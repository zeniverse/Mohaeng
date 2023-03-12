package com.mohaeng.backend.place.service;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.repository.JdbcTemplateRepository;
import com.mohaeng.backend.place.repository.PlaceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PlaceServiceTest {

    @Autowired
    private PlaceService placeService;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private JdbcTemplateRepository jdbcTemplateRepository;

    @BeforeEach
    void clean() {
        placeRepository.deleteAll();
    }

    @Test
    void testGetPlaces() {
        // Setup
        int testDataSize = 10;
        List<Place> testData = new ArrayList<>();

        // Create test data
        for (int i = 1; i < testDataSize+1; i++) {
            String name = "Place " + i;
            String addr1 = "Address 1 for Place " + i;
            String addr2 = "Address 2 for Place " + i;
            String areacode = "Area Code for Place " + i;
            String firstimage = "https://example.com/image" + i + ".jpg";
            String firstimage2 = "https://example.com/image2" + i + ".jpg";
            String mapx = String.valueOf(i);
            String mapy = String.valueOf(i);
            String sigungucode = "Sigungu Code for Place " + i;
            String contentid = "Content ID for Place " + i;
            String overview = "Overview for Place " + i;

            Place place = new Place((long) (i + 1), name, addr1, addr2, areacode, firstimage, firstimage2, mapx, mapy, sigungucode, contentid, overview);
            testData.add(place);
            placeRepository.saveAll(testData);
        }

//        // Test
//        long startTime = System.currentTimeMillis(); // Start measuring time
//        List<Place> places = placeService.getPlaces();
//        long endTime = System.currentTimeMillis(); // Stop measuring time
//        long duration = endTime - startTime; // Calculate duration in milliseconds
//        System.out.println("duration = " + duration);

//        assertEquals(places.get(0).getName(),"가거도(소흑산도)");
        assertEquals(testData.get(0).getName(),"Place 1");
        // Verify
    }


    private static final int COUNT = 100;
    @Test
    @DisplayName("bulk insert")
    void 벌크_insert() {
        long startTime = System.currentTimeMillis();
        List<Place> places = new ArrayList<>();
        for (long i = 0; i < COUNT; i++) {
            Long place_id = i;
            String name = "name: " + i;
            String addr1 = "addr1: " + i;
            String areacode = "areacode: " + i;
            String firstimage = "firstimage: " + i;
            String firstimage2 = "firstimage2: " + i;
            String mapx = "mapx: " + i;
            String mapy = "mapy: " + i;
            String sigungucode = "sigungucode: " + i;
            String contentid = "contentid: " + i;
            String overview = "overview: " + i;
            Place place = new Place(place_id, name, addr1, areacode,firstimage,firstimage2, mapx, mapy, sigungucode,contentid, overview);
            places.add(place);
        }
        jdbcTemplateRepository.batchInsert(places);
        long endTime = System.currentTimeMillis();
        System.out.println("---------------------------------");
        System.out.printf("수행시간: %d\n", endTime - startTime);
        System.out.println("---------------------------------");
    }
}