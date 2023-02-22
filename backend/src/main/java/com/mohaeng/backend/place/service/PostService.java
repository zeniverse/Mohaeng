package com.mohaeng.backend.place.service;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {

    private final PlaceRepository placeRepository;

    public void write(Place place){
        placeRepository.save(place);
    }

}
