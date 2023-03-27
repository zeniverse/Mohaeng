package com.mohaeng.backend.place.controller;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.dto.PlaceDTO;
import com.mohaeng.backend.place.repository.PlaceRepository;
import com.mohaeng.backend.place.service.PlaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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



    @GetMapping("/api/place/all")
    public ResponseEntity<List<Place>> getPlaces() {
        List<Place> places = placeService.getPlacesAll();
        log.info("getPlaces.size:{}", places.size());
        return new ResponseEntity<>(places, HttpStatus.OK);
    }


    @GetMapping("/place/{address}")
    public ResponseEntity<List<Place>> getPlacesByAddress(@PathVariable String address) {
        List<Place> places = placeService.getPlacesByAddress(address);
        log.info("search places.size:{} ", places.size());
//        return ResponseEntity.ok().body(BaseResponse.success("OK",res));
        return new ResponseEntity<>(places, HttpStatus.OK);
    }

    @GetMapping("/api/place")
    public List<Place> search(@RequestParam String keyword, @RequestParam(required = false) String address) {
        if (address == null || address.isEmpty()) {
            return placeRepository.findByNameContaining(keyword);
        } else {
            return placeRepository.findByNameContainingOrAddressContaining(keyword,address);
        }
    }

    @GetMapping("/api/place/{contentId}")
    public ResponseEntity<PlaceDTO> getPlace(@PathVariable String contentId) throws IOException, ParserConfigurationException, SAXException {
        Place place = placeService.getPlace(contentId);
        if (place == null) {
            return ResponseEntity.notFound().build();
        }
        PlaceDTO dto = placeService.toPlaceDTO(place);
        return ResponseEntity.ok(dto);
    }


    @GetMapping("/place/overview/{placeName}")
    public ResponseEntity<List<String>> getPlaceOverview(@PathVariable String placeName) throws IOException, ParserConfigurationException, SAXException {
        List<String> overview = placeService.getPlaceOverview(placeName);
        log.info("overview:{}", overview);
        return ResponseEntity.ok(overview);
    }

    @GetMapping("/api/places")
    public Page<Place> getPlaces(@RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 4, Sort.by("id").ascending());
        return placeRepository.findAll(pageable);
    }

    @GetMapping("/places")
    public List<Place> getPlaces(@RequestParam String areaCode,
                                 @RequestParam(defaultValue = "0") int page) throws IOException, ParserConfigurationException, SAXException {
        List<Place> places = placeService.getPlaces();
        List<Place> filteredPlaces = placeService.filterPlaces(places, areaCode);
        int start = page * 4;
        int end = Math.min(start + 4, filteredPlaces.size());
        return filteredPlaces.subList(start, end);
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


