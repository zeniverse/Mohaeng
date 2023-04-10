package com.mohaeng.backend.place.controller;

import com.mohaeng.backend.Image.AmazonS3Service;
import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.place.domain.Review;
import com.mohaeng.backend.place.dto.request.CreateReviewRequest;
import com.mohaeng.backend.place.dto.request.UpdateReviewRequest;
import com.mohaeng.backend.place.dto.response.FindAllReviewResponse;
import com.mohaeng.backend.place.dto.response.FindReviewResponse;
import com.mohaeng.backend.place.dto.response.FindSearchReviewsResponse;
import com.mohaeng.backend.place.service.ReviewService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@ResponseBody
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final TokenGenerator tokenGenerator;
    private final AmazonS3Service amazonS3Service;

    @GetMapping("/review/{placeId}")
    public ResponseEntity getPlaceReview(@PathVariable Long placeId,
                                         @RequestParam(defaultValue = "1") int page) {
        Page<Review> reviews = reviewService.getAllReviewByPage(placeId, page);
        List<FindAllReviewResponse> data = reviews.map(FindAllReviewResponse::of).getContent();
        double averageRating = reviewService.getAverageRating(reviewService.getAllReviews(placeId));
        FindSearchReviewsResponse response = new FindSearchReviewsResponse(data, reviews.getTotalPages(), reviews.getTotalElements(), averageRating);
        return ResponseEntity.ok(BaseResponse.success("ok", response));
    }

    @GetMapping("/review/detail/{reviewId}")
    public ResponseEntity getReview(@PathVariable Long reviewId) {
        Review review = reviewService.getReviewById(reviewId);
        FindReviewResponse response = FindReviewResponse.of(review);
        return ResponseEntity.ok(BaseResponse.success("ok", response));
    }

    @PostMapping("/review/{placeId}")
    public ResponseEntity addPlaceReview(@PathVariable Long placeId, HttpServletRequest request,
                                         @RequestPart(value = "review") @Valid CreateReviewRequest createReviewRequest,
                                         @RequestPart(value = "multipartFile", required = false) List<MultipartFile> multipartFileList) {
        String email = getEmail(request);
        List<String> fileNameList = null;
        if (multipartFileList != null) {
            fileNameList = amazonS3Service.uploadFile(multipartFileList);
        }
        reviewService.createReview(email, placeId, createReviewRequest, fileNameList);
        return ResponseEntity.ok(BaseResponse.success("ok", ""));
    }

    @PutMapping("/review/detail/{reviewId}")
    public ResponseEntity updateReview(@PathVariable Long reviewId,
                                       @RequestPart(value = "review") @Valid UpdateReviewRequest updateReviewRequest,
                                       @RequestPart(value = "multipartFile", required = false) List<MultipartFile> multipartFileList) {
        List<String> fileNameList = null;
        if (multipartFileList != null) {
            fileNameList = amazonS3Service.uploadFile(multipartFileList);
        }
        reviewService.updateReview(reviewId, updateReviewRequest, fileNameList);
        return ResponseEntity.ok(BaseResponse.success("ok", ""));
    }

    @DeleteMapping("/review/detail/{reviewId}")
    public ResponseEntity deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok(BaseResponse.success("ok", ""));
    }

    private String getEmail(HttpServletRequest httpServletRequest) {
        return tokenGenerator.parseEmailFromToken(httpServletRequest.getHeader("Access-Token"));
    }

    @GetMapping("/review/{placeId}/rating")
    public ResponseEntity getPlaceReviewsByRating(@PathVariable Long placeId,
                                                  @RequestParam(defaultValue = "1") int page) {
        Page<Review> reviews = reviewService.getAllReviewsByRating(placeId, page);
        List<FindAllReviewResponse> data = reviews.map(FindAllReviewResponse::of).getContent();
        double averageRating = reviewService.getAverageRating(reviewService.getAllReviews(placeId));
        FindSearchReviewsResponse response = new FindSearchReviewsResponse(data, reviews.getTotalPages(), reviews.getTotalElements(), averageRating);
        return ResponseEntity.ok(BaseResponse.success("ok", response));
    }

    @GetMapping("/review/{placeId}/date")
    public ResponseEntity getPlaceReviewsByDate(@PathVariable Long placeId,
                                                @RequestParam(defaultValue = "1") int page) {
        Page<Review> reviews = reviewService.getAllReviewsByDate(placeId, page);
        List<FindAllReviewResponse> data = reviews.map(FindAllReviewResponse::of).getContent();
        double averageRating = reviewService.getAverageRating(reviews.getContent());
        FindSearchReviewsResponse response = new FindSearchReviewsResponse(data, reviews.getTotalPages(), reviews.getTotalElements(), averageRating);
        return ResponseEntity.ok(BaseResponse.success("ok", response));
    }

}
