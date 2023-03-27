package com.mohaeng.backend.place.service;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.repository.JdbcTemplateRepository;
import com.mohaeng.backend.place.repository.PlaceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
            String areacode = "Area Code for Place " + i;
            String firstimage = "https://example.com/image" + i + ".jpg";
            String firstimage2 = "https://example.com/image2" + i + ".jpg";
            String mapx = "map x " + i;
            String mapy = "map y " + i;
            String sigungucode = "Sigungu Code for Place " + i;
            String contentid = "Content ID for Place " + i;

            Place place = new Place((long) i, name, addr1, areacode, firstimage, firstimage2, mapx, mapy, sigungucode, contentid);
            testData.add(place);
            placeRepository.saveAll(testData);
            placeRepository.flush();

            String findName = placeRepository.findAll().get(0).getName();
            String findAreacode = placeRepository.findAll().get(0).getAreaCode();
            String findContentid = placeRepository.findAll().get(0).getContentId();
            assertEquals("Place 1",findName);
            assertEquals("Area Code for Place 1",findAreacode);
            assertEquals("Content ID for Place 1",findContentid);
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



}