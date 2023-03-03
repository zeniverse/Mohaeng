package com.mohaeng.backend.place.controller;

import com.mohaeng.backend.place.domain.AddPlace;
import com.mohaeng.backend.place.dto.request.AddPlaceCreate;
import com.mohaeng.backend.place.dto.response.AddPlaceResponse;
import com.mohaeng.backend.place.entity.Category;
import com.mohaeng.backend.place.repository.AddPlaceRepository;
import com.mohaeng.backend.place.service.ApiService;
import com.mohaeng.backend.place.service.AddPlaceService;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PlaceController {

    private final AddPlaceService addPlaceService;
    private final ApiService apiService;
    private final AddPlaceRepository addPlaceRepository;

    @PostConstruct
    public void init() throws Exception {
            AddPlaceCreate addPlaceCreate1 = AddPlaceCreate.builder()
                    .username("hong")
                    .name("경복궁")
                    .address("서울시")
                    .email("binaryhong@gmail.com")
                    .category(Category.place)
                    .menu("성인 1만원, 소인 5천원")
                    .availableTime("9:00 ~ 18:00")
                    .latitude("latitude xxx")
                    .longitude("longitude xxx")
                    .registered(Boolean.TRUE)
                .build();

        addPlaceService.write(addPlaceCreate1);

        AddPlaceCreate addPlaceCreate2 = AddPlaceCreate.builder()
                .username("mong")
                .name("카카오")
                .address("성남시")
                .email("binaryhong@kakao.com")
                .category(Category.RESTAURANT)
                .menu("성인 10만원, 소인 5만원")
                .availableTime("9:00 ~ 18:00")
                .latitude("latitude xxx")
                .longitude("longitude xxx")
                .registered(Boolean.TRUE)
                .build();
        addPlaceService.write(addPlaceCreate2);
    }


    @PostMapping("/addPlace")
    public AddPlaceCreate postPlace(@RequestBody @Valid AddPlaceCreate request) {
        addPlaceService.write(request);
        return request;
    }

    @PutMapping("/addPlace/{placeId}")
    public ResponseEntity<AddPlace> updatePlace(@PathVariable Long placeId, @RequestBody AddPlace updatePlace) throws Exception {
        // Retrieve the existing post from the database
        AddPlace existingPlace = addPlaceRepository.findById(placeId)
                .orElseThrow(() -> new Exception("error PlaceId Not Found"));


        // Set the updated post properties
        existingPlace = new AddPlace(
                existingPlace.getId(),
                existingPlace.getUsername(),
                updatePlace.getName(),
                updatePlace.getAddress(),
                updatePlace.getCategory(),
                updatePlace.getAvailableTime(),
                updatePlace.getMenu(),
                updatePlace.getEmail(),
                updatePlace.getLatitude(),
                updatePlace.getLongitude(),
                updatePlace.isRegistered()
        );
        addPlaceRepository.save(existingPlace);

        return ResponseEntity.ok(existingPlace);
    }

    @GetMapping("/addPlace/{placeId}")
    public AddPlaceResponse get(@PathVariable Long placeId) {
        return addPlaceService.findById(placeId);
    }

    @GetMapping("/addPlace")
    public ResponseEntity<List<com.mohaeng.backend.place.domain.AddPlace>> getList() {
        return ResponseEntity.ok(addPlaceService.findAll());
    }

    @DeleteMapping("/addPlace/{placeId}")
    public void delete(@PathVariable Long placeId) {
        addPlaceService.delete(placeId);
    }
//
//    @GetMapping("/api/place")
//    public ResponseEntity<List<PlaceResponseDto>> getPlace(
//
//    );
}

