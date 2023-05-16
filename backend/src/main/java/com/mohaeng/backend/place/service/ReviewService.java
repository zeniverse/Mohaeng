package com.mohaeng.backend.place.service;

import com.mohaeng.backend.Image.AmazonS3Service;
import com.mohaeng.backend.exception.notfound.MemberNotFoundException;
import com.mohaeng.backend.exception.notfound.PlaceNotFoundException;
import com.mohaeng.backend.exception.notfound.ReviewNotFoundException;
import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.repository.MemberRepository;
import com.mohaeng.backend.place.domain.Place;
import com.mohaeng.backend.place.domain.Review;
import com.mohaeng.backend.place.domain.ReviewImage;
import com.mohaeng.backend.place.dto.request.CreateReviewRequest;
import com.mohaeng.backend.place.dto.request.UpdateReviewRequest;
import com.mohaeng.backend.place.dto.response.FindAllReviewResponse;
import com.mohaeng.backend.place.repository.PlaceRepository;
import com.mohaeng.backend.place.repository.ReviewImageRepository;
import com.mohaeng.backend.place.repository.ReviewRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final PlaceRepository placeRepository;
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final ReviewImageRepository reviewImageRepository;
    private final AmazonS3Service amazonS3Service;

    private final EntityManager entityManager;


    public List<FindAllReviewResponse> getAllReview(Long id) {
        Place findPlace = placeRepository.findById(id)
                .orElseThrow(() -> new PlaceNotFoundException());

        return findPlace.getReviewList().stream()
                .map(m -> FindAllReviewResponse.of(m,findPlace))
                .collect(Collectors.toList());
    }


    public Page<Review> getAllReviewByPage(Long id, int page) {
        Place findPlace = placeRepository.findById(id)
                .orElseThrow(() -> new PlaceNotFoundException());

        Pageable pageable = PageRequest.of(page - 1, 4);
        Page<Review> reviews = reviewRepository.findAllByPlaceId(id, pageable);
//        List<FindAllReviewResponse> reviewResponses = reviews.map(FindAllReviewResponse::of).getContent();
        return reviews;
    }

    public List<Review> getAllReviewById(Long id) {
        return reviewRepository.findAllByPlaceId(id);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }



    @Transactional
    public void createReview(String email, Long placeId, CreateReviewRequest createReviewRequest, List<String> fileNameList) {
        Place findPlace = placeRepository.findById(placeId)
                .orElseThrow(() -> new PlaceNotFoundException());
        Member findMember = memberRepository.findByEmailAndDeletedDateIsNull(email)
                .orElseThrow(() -> new MemberNotFoundException());

        LocalDateTime createdDate = createReviewRequest.getCreatedDate();
        if (createdDate == null) {
            // Set a default value or handle the error
            createdDate = LocalDateTime.now();
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedCreatedDate = createdDate.format(formatter);
        Review review = Review.builder()
                .place(findPlace)
                .member(findMember)
                .title(createReviewRequest.getTitle())
                .rating(createReviewRequest.getRating())
                .content(createReviewRequest.getContent())
                .reviewImageList(new ArrayList<>())
                .createdDate(createdDate)
                .build();

        reviewRepository.save(review);
        findMember.addReview(review);
        findPlace.addReview(review);

        double averageRating = reviewRepository.getAverageRatingByPlaceId(placeId);
        findPlace.updateRating(averageRating);
        if (fileNameList != null && !fileNameList.isEmpty()) {
            registerImage(fileNameList, review);
        }
        entityManager.flush();
        entityManager.clear();
    }

    @Transactional
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
        entityManager.flush();
        entityManager.clear();
    }

    @Transactional
    public void updateReview(Long placeId, UpdateReviewRequest updateReviewRequest, List<String> fileNameList) {
        Place findPlace = placeRepository.findById(placeId)
                .orElseThrow(() -> new PlaceNotFoundException());

        Review review = reviewRepository.findById(placeId)
                .orElseThrow(() -> new ReviewNotFoundException());
        review.update(updateReviewRequest.getTitle(), updateReviewRequest.getContent(), updateReviewRequest.getRating());

        // Delete existing images
        for (ReviewImage reviewImage : review.getReviewImageList()) {
            reviewImageRepository.delete(reviewImage);
        }
        review.getReviewImageList().clear();

        // Add new images
        if (fileNameList != null) {
            registerImage(fileNameList, review);
        }

        double averageRating = reviewRepository.getAverageRatingByPlaceId(placeId);
        findPlace.updateRating(averageRating);
//        registerImage(fileNameList, review); JPA 1차 캐시 문제 해결.
        entityManager.flush();
        entityManager.clear();
    }

    @Transactional
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewNotFoundException());


        // Delete images from storage service
        for (ReviewImage reviewImage : review.getReviewImageList()) {
            amazonS3Service.deleteFile(reviewImage.getImageUrl() + "/" + reviewImage.getImageName());
        }

        // Delete related images
        reviewImageRepository.deleteAll(review.getReviewImageList());

        // Delete review and related images from database
        reviewRepository.delete(review);
        // Clear JPA cache
        entityManager.flush();
        entityManager.clear();
    }

    public double getAverageRating(List<Review> reviews) {
        return reviews.stream()
                .mapToDouble(r -> Double.parseDouble(r.getRating()))
                .average()
                .orElse(0.0);
    }

    public Review getReviewById(Long reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewNotFoundException());
    }

    public Page<Review> getAllReviewsByRating(Long placeId, int page) {
        Pageable pageable = PageRequest.of(page - 1 , 4, Sort.by("rating").descending());
        return reviewRepository.findAllByPlaceId(placeId, pageable);
    }

    public List<Review> getAllReviewsByRatingTop10() {
        List<Place> places = placeRepository.findTop10ByAvgRating();
        List<Review> reviews = places.stream()
                .map(place -> place.getReviewList().stream().max(Comparator.comparing(Review::getRating)).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        if (reviews.isEmpty()) {
            places = placeRepository.findTop10WithoutReviews();
            reviews = places.stream()
                    .map(place -> new Review(place, "0"))
                    .collect(Collectors.toList());
        }
        return reviews;
    }

    public Page<Review> getAllReviewsByDate(Long placeId, int page) {
        Pageable pageable = PageRequest.of(page - 1, 4, Sort.by("createdDate").descending());
        return reviewRepository.findAllByPlaceId(placeId, pageable);
    }

}
