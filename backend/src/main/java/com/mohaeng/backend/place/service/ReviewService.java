package com.mohaeng.backend.place.service;

import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.dto.response.FindAllReviewResponse;
import com.mohaeng.backend.place.exception.PlaceNotFoundException;
import com.mohaeng.backend.place.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final PlaceRepository placeRepository;

    public List<FindAllReviewResponse> getAllReview(Long id) {
        Place findPlace = placeRepository.findById(id)
                .orElseThrow(() -> new PlaceNotFoundException("NOT_EXIST_PLACE"));

        return findPlace.getReviewList().stream()
                .map(m -> FindAllReviewResponse.of(m))
                .collect(Collectors.toList());
    }
}
