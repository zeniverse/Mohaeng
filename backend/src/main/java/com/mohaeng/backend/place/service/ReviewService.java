package com.mohaeng.backend.place.service;

import com.mohaeng.backend.exception.notfound.MemberNotFoundException;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.domain.Review;
import com.mohaeng.backend.place.domain.ReviewImage;
import com.mohaeng.backend.place.dto.request.CreateReviewRequest;
import com.mohaeng.backend.place.dto.response.FindAllReviewResponse;
import com.mohaeng.backend.place.exception.PlaceNotFoundException;
import com.mohaeng.backend.place.repository.PlaceRepository;
import com.mohaeng.backend.place.repository.ReviewImageRepository;
import com.mohaeng.backend.place.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final PlaceRepository placeRepository;
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final ReviewImageRepository reviewImageRepository;

    public List<FindAllReviewResponse> getAllReview(Long id) {
        Place findPlace = placeRepository.findById(id)
                .orElseThrow(() -> new PlaceNotFoundException("NOT_EXIST_PLACE"));

        return findPlace.getReviewList().stream()
                .map(m -> FindAllReviewResponse.of(m))
                .collect(Collectors.toList());
    }

    @Transactional
    public void createReview(String email, Long placeId, CreateReviewRequest createReviewRequest, List<String> filaNameList) {
        Place findPlace = placeRepository.findById(placeId)
                .orElseThrow(() -> new PlaceNotFoundException("NOT_EXIST_PLACE"));
        Member findMember = memberRepository.findByEmailAndDeletedDateIsNull(email)
                .orElseThrow(() -> new MemberNotFoundException());
        Review review = Review.builder()
                .place(findPlace)
                .member(findMember)
                .title(createReviewRequest.getTitle())
                .rating(createReviewRequest.getRating())
                .content(createReviewRequest.getContent())
                .reviewImageList(new ArrayList<>())
                .build();

        reviewRepository.save(review);
        findMember.addReview(review);
        findPlace.addReview(review);

        registerImage(filaNameList, review);

    }

    private void registerImage(List<String> filaNameList, Review review) {
        for (String fullName : filaNameList) {
            String fileName = fullName.substring(fullName.lastIndexOf("/") + 1);
            String url = fullName.substring(0, fullName.lastIndexOf("/"));
            ReviewImage reviewImage = ReviewImage.builder()
                    .review(review)
                    .imageUrl(url)
                    .imageName(fileName)
                    .build();
            review.addReviewImage(reviewImage);
            reviewImageRepository.save(reviewImage);
        }
    }
}
