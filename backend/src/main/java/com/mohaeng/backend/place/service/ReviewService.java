package com.mohaeng.backend.place.service;

import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.domain.Review;
import com.mohaeng.backend.place.dto.request.CreateReviewRequest;
import com.mohaeng.backend.place.dto.response.FindAllReviewResponse;
import com.mohaeng.backend.place.exception.PlaceNotFoundException;
import com.mohaeng.backend.place.repository.PlaceRepository;
import com.mohaeng.backend.place.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final PlaceRepository placeRepository;
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;

    public List<FindAllReviewResponse> getAllReview(Long id) {
        Place findPlace = placeRepository.findById(id)
                .orElseThrow(() -> new PlaceNotFoundException("NOT_EXIST_PLACE"));

        return findPlace.getReviewList().stream()
                .map(m -> FindAllReviewResponse.of(m))
                .collect(Collectors.toList());
    }

    @Transactional
    public void createReview(String email, Long placeId, CreateReviewRequest createReviewRequest, MultipartFile multipartFile) {
        Place findPlace = placeRepository.findById(placeId)
                .orElseThrow(() -> new PlaceNotFoundException("NOT_EXIST_PLACE"));
        Member findMember = memberRepository.findByEmailAndDeletedDateIsNull(email)
                .orElseThrow(() -> new IllegalArgumentException("NOT_EXIST_MEMBER"));
        Review review = Review.builder()
                .place(findPlace)
                .member(findMember)
                .title(createReviewRequest.getTitle())
                .rating(createReviewRequest.getRating())
                .content(createReviewRequest.getContent())
                .build();

        reviewRepository.save(review);
        findMember.addReview(review);
        findPlace.addReview(review);
    }
}
