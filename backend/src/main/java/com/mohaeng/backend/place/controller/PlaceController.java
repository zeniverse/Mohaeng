package com.mohaeng.backend.place.controller;

import com.mohaeng.backend.place.domain.AddPlace;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.dto.request.AddPlaceCreate;
import com.mohaeng.backend.place.dto.response.AddPlaceResponse;
import com.mohaeng.backend.place.entity.Category;
import com.mohaeng.backend.place.repository.AddPlaceRepository;
import com.mohaeng.backend.place.repository.PlaceRepository;
import com.mohaeng.backend.place.service.AddPlaceService;
import com.mohaeng.backend.place.service.PlaceService;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;


@RestController
@RequiredArgsConstructor
@Slf4j
public class PlaceController {

    private final PlaceService placeService;
    private final PlaceRepository placeRepository;



    @GetMapping("/place")
    public ResponseEntity<List<Place>> getPlaces() {
        List<Place> places = placeService.getPlacesAll();
        log.info("getPlaces.size:{}", places.size());
        return new ResponseEntity<>(places, HttpStatus.OK);
    }


    @GetMapping("/place/{addr1}")
    public ResponseEntity<List<Place>> getPlacesByAddr1(@PathVariable String addr1) {
        // 데이터베이스에서 모든 데이터를 가져옵니다.
        List<Place> places = placeService.getPlacesByAddr1(addr1);
        log.info("search places.size:{} ", places.size());
        return new ResponseEntity<>(places, HttpStatus.OK);
    }

}
//    @GetMapping("/place/{addr1}")
//    public ResponseEntity<List<Place>> searchPlace(@PathVariable String addr1) throws JAXBException, IOException, ParserConfigurationException, SAXException {
//        // 데이터베이스에서 모든 데이터를 가져옵니다.
//        List<Place> places = placeService.getPlacesByAddr1(addr1);
//        log.info("search places.size:{} ",places.size());
//        // addr1 값이 입력받은 검색어로 시작하는 데이터만 필터링합니다.
////        List<Place> filteredPlaces = places.stream()
////                .filter(place -> place.getAddr1().startsWith(addr1))
////                .collect(Collectors.toList());
//        // 필터링한 결과를 반환합니다.
////        log.info("filteredPlaces.size:{} ",filteredPlaces.size());
//        return new ResponseEntity<>(places, HttpStatus.OK);
//    }


