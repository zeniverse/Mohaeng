package com.mohaeng.backend.place.service;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.dto.PlacePostDto;
import com.mohaeng.backend.place.dto.request.PlaceCreate;
import com.mohaeng.backend.place.dto.response.PlaceResponse;
import com.mohaeng.backend.place.entity.Category;
import com.mohaeng.backend.place.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;

    @Transactional
    public void write(PlaceCreate placeCreate){
        Place place = Place.builder()
                .name(placeCreate.getName())
                .address(placeCreate.getAddress())
                .category(Category.valueOf(placeCreate.getCategory()))
                .availableTime(placeCreate.getAvailableTime())
                .menu(placeCreate.getMenu())
                .email(placeCreate.getEmail())
                .latitude(placeCreate.getLatitude())
                .longitude(placeCreate.getLongitude())
                .build();
        placeRepository.save(place);
    }

    @Transactional
    public void update(Long id, PlacePostDto placePostDto) {
        Place place = placeRepository.findById(id).orElseThrow(null);
        place.update(placePostDto);
    }

    public PlaceResponse findById(Long id) {
        Place place = placeRepository.findById(id).orElse(null);

        return PlaceResponse.builder()
            .id(place.getId())
            .name(place.getName())
            .address(place.getAddress())
            .category(place.getCategory())
            .availableTime(place.getAvailableTime())
            .menu(place.getMenu())
            .email(place.getEmail())
            .latitude(place.getLatitude())
            .longitude(place.getLongitude())
            .build();
    }


    public List<Place> findAll() {
        return placeRepository.findAll();
    }

    public void delete(Long id) {
        Place place = placeRepository.findById(id).orElseThrow(null);
        placeRepository.delete(place);
    }

}
