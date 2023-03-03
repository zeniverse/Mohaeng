package com.mohaeng.backend.service;

import com.mohaeng.backend.place.repository.AddPlaceRepository;
import com.mohaeng.backend.place.service.AddPlaceService;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AddPlaceCreateServiceTest {

    @Autowired
    private AddPlaceService addPlaceService;

    @Autowired
    private AddPlaceRepository addPlaceRepository;

    @BeforeEach
    void clean() {
        addPlaceRepository.deleteAll();
    }




}
