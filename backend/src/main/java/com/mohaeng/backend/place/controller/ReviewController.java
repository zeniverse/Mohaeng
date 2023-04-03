package com.mohaeng.backend.place.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.place.dto.request.CreateReviewRequest;
import com.mohaeng.backend.place.dto.response.FindAllReviewResponse;
import com.mohaeng.backend.place.service.ReviewService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
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

    @GetMapping("/review/{placeId}")
    public ResponseEntity getPlaceReview(@PathVariable Long placeId) {
        List<FindAllReviewResponse> data = reviewService.getAllReview(placeId);
        return ResponseEntity.ok(BaseResponse.success("ok", data));
    }

    @PostMapping("/review/{placeId}")
    public ResponseEntity addPlaceReview(@PathVariable Long placeId, HttpServletRequest request,
                                         @RequestPart(value = "review") @Valid CreateReviewRequest createReviewRequest,
                                         @RequestPart(value = "multipartFile", required = false) MultipartFile multipartFile) {
        String email = getEmail(request);
        reviewService.createReview(email, placeId, createReviewRequest, multipartFile);
        return ResponseEntity.ok(BaseResponse.success("ok", ""));
    }

    private String getEmail(HttpServletRequest httpServletRequest) {
        return tokenGenerator.parseEmailFromToken(httpServletRequest.getHeader("Access-Token"));
    }


}
