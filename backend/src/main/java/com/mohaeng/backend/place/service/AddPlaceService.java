package com.mohaeng.backend.place.service;

import com.mohaeng.backend.place.domain.AddPlace;
import com.mohaeng.backend.place.dto.AddPlacePostDto;
import com.mohaeng.backend.place.dto.request.AddPlaceCreate;
import com.mohaeng.backend.place.dto.response.AddPlaceResponse;
import com.mohaeng.backend.place.entity.Category;
import com.mohaeng.backend.place.repository.AddPlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AddPlaceService {

    private final AddPlaceRepository addPlaceRepository;

    @Transactional
    public void write(AddPlaceCreate placeCreate){
        AddPlace addPlace = AddPlace.builder()
                .username(placeCreate.getUsername())
                .name(placeCreate.getName())
                .address(placeCreate.getAddress())
                .category(Category.valueOf(placeCreate.getCategory()))
                .availableTime(placeCreate.getAvailableTime())
                .menu(placeCreate.getMenu())
                .email(placeCreate.getEmail())
                .latitude(placeCreate.getLatitude())
                .longitude(placeCreate.getLongitude())
                .isRegistered(placeCreate.isRegistered())
                .build();
        addPlaceRepository.save(addPlace);
    }

    @Transactional
    public void update(Long id, AddPlacePostDto addPlacePostDto) {
        AddPlace addplace = addPlaceRepository.findById(id).orElseThrow(null);
        addplace.update(addPlacePostDto);
    }

    public AddPlaceResponse findById(Long id) {
        AddPlace addPlace = addPlaceRepository.findById(id).orElse(null);

        return AddPlaceResponse.builder()
            .id(addPlace.getId())
            .username(addPlace.getUsername())
            .name(addPlace.getName())
            .address(addPlace.getAddress())
            .category(addPlace.getCategory())
            .availableTime(addPlace.getAvailableTime())
            .menu(addPlace.getMenu())
            .email(addPlace.getEmail())
            .latitude(addPlace.getLatitude())
            .longitude(addPlace.getLongitude())
            .registered(addPlace.isRegistered())
            .build();
    }


    public List<AddPlace> findAll() {
        return addPlaceRepository.findAll();
    }

    public void delete(Long id) {
        AddPlace addPlace = addPlaceRepository.findById(id).orElseThrow(null);
        addPlaceRepository.delete(addPlace);
    }

}
