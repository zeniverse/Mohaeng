package com.mohaeng.backend.place.controller;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.repository.PlaceRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class MemberController {

    private final PlaceRepository placeRepository;

    public MemberController(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    @PostMapping("/place")
    public Place postPlace(@RequestBody Place place) {
        return placeRepository.save(place);
    }
}
