package com.mohaeng.backend.place.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.exception.notfound.MemberNotFoundException;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.domain.Review;
import com.mohaeng.backend.place.dto.FindAllPlacesDto;
import com.mohaeng.backend.place.dto.PlaceDTO;
import com.mohaeng.backend.place.dto.PlaceRatingDto;
import com.mohaeng.backend.place.dto.PlaceSearchDto;
import com.mohaeng.backend.place.dto.response.*;
import com.mohaeng.backend.place.repository.PlaceBookmarkRepository;
import com.mohaeng.backend.place.repository.PlaceRepository;
import com.mohaeng.backend.place.service.PlaceService;
import com.mohaeng.backend.place.service.ReviewService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class PlaceController {

    private final PlaceService placeService;
    private final PlaceRepository placeRepository;
    private final MemberRepository memberRepository;
    private final TokenGenerator tokenGenerator;
    private final PlaceBookmarkRepository placeBookmarkRepository;
    private final ReviewService reviewService;

    @GetMapping("/place/all")
    public ResponseEntity<List<Place>> getPlaces() {
        List<Place> places = placeService.getPlacesAll();
        log.info("getPlaces.size:{}", places.size());
        return new ResponseEntity<>(places, HttpStatus.OK);
    }

    @GetMapping("/place/{address}")
    public ResponseEntity<List<Place>> getPlacesByAddress(@PathVariable String address) {
        List<Place> places = placeService.getPlacesByAddress(address);
        log.info("search places.size:{} ", places.size());
        return new ResponseEntity<>(places, HttpStatus.OK);
    }

    @GetMapping("/place/{contentId}")
    public ResponseEntity<PlaceDTO> getPlace(@PathVariable String contentId) throws IOException, ParserConfigurationException, SAXException {
        Place place = placeService.getPlaceByContentId(contentId);
        if (place == null) {
            return ResponseEntity.notFound().build();
        }
        PlaceDTO dto = placeService.toPlaceDTO(place);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/place/overview/{contentId}")
    public ResponseEntity<BaseResponse<PlaceDetailsResponse>> getPlaceDetail(@PathVariable String contentId,
                                                                             HttpServletRequest request) throws IOException, ParserConfigurationException, SAXException {
        PlaceDetailsResponse response = placeService.getPlaceDetailsByContentId(contentId, isAccessMember(request));
        return ResponseEntity.ok().body(BaseResponse.success("OK",response));
    }

    @GetMapping("/home/places")
    public Page<Place> getPlaces(@RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 4, Sort.by("id").ascending());
        return placeRepository.findAll(pageable);
    }

    @GetMapping("/place")
    public ResponseEntity<BaseResponse<FindSearchPlacesResponse>> search(
        @RequestParam String keyword, @RequestParam(required = false) String address,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "12") int size,
        HttpServletRequest request) {

        Pageable pageable = PageRequest.of(page - 1, size);
        Member member = isAccessMember(request);
        Page<Place> places;
        if (address == null || address.isEmpty()) {
            places = placeRepository.findByNameContaining(keyword, pageable);
        } else {
            places = placeRepository.findByNameContainingOrAddressContaining(keyword, address, pageable);
        }

        List<PlaceSearchDto> result = new ArrayList<>();
        for (Place place : places) {
            boolean isBookmark = false;
            if(member != null){
                isBookmark = placeBookmarkRepository.existsPlaceBookmarkByMemberAndPlace(member, place);
            }
            PlaceRatingDto rating = placeService.getPlaceRating(place.getId());
            PlaceSearchDto dto = PlaceSearchDto.from(place, isBookmark, Math.round(rating.getAverageRating() * 100) / 100.0, rating.getReviewTotalElements());
            result.add(dto);
        }
        FindSearchPlacesResponse response = new FindSearchPlacesResponse(result, places.getTotalPages(), places.getTotalElements());
        return ResponseEntity.ok().body(BaseResponse.success("OK", response));
    }

    @GetMapping("/places")
    public ResponseEntity<BaseResponse<FindAllPlacesResponse>> findAllPlace(
        @RequestParam String areaCode,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "12") int size,
        HttpServletRequest request) {

        Pageable pageable = PageRequest.of(page - 1, size);
        Member member = isAccessMember(request);
        Page<Place> places;

        if ("all".equals(areaCode)) {
            places = placeRepository.findAll(pageable);
        } else {
            places = placeRepository.findByAreaCodeEquals(areaCode, pageable);
        }

        List<FindAllPlacesDto> result = new ArrayList<>();
        for (Place place : places) {
            boolean isBookmark = false;
            if(member != null){
                isBookmark = placeBookmarkRepository.existsPlaceBookmarkByMemberAndPlace(member, place);
            }
            PlaceRatingDto rating = placeService.getPlaceRating(place.getId());
            FindAllPlacesDto dto = FindAllPlacesDto.from(place, isBookmark, Math.round(rating.getAverageRating() * 100) / 100.0, rating.getReviewTotalElements());
            result.add(dto);
        }

        FindAllPlacesResponse response = new FindAllPlacesResponse(result, places.getTotalPages(), places.getTotalElements());
        return ResponseEntity.ok().body(BaseResponse.success("OK", response));
    }

    @GetMapping("/main")
    public ResponseEntity getPlaceReviewsByRatingTop10(
            @RequestParam(defaultValue = "1") int page) {
        Page<Review> reviews = reviewService.getAllReviewsByRatingTop10(page);
        List<FindAllReviewResponse> data = reviews.map(FindAllReviewResponse::of).getContent();
        double averageRating = Math.round(reviewService.getAverageRating(reviewService.getAllReviews()) * 100.0) / 100.0;
        FindSearchReviewsResponse response = new FindSearchReviewsResponse(data, reviews.getTotalPages(), reviews.getTotalElements(), averageRating);
        return ResponseEntity.ok(BaseResponse.success("ok", response));
    }

    private Member isAccessMember(HttpServletRequest request){
        if (request.getHeader("Access-Token") == null){
            return null;
        }
        else{
            return memberRepository.findByEmail(tokenGenerator.parseEmailFromToken(request.getHeader("Access-Token")))
                    .orElseThrow(MemberNotFoundException::new);
        }
    }
}


