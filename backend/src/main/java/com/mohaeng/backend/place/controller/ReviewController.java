package com.mohaeng.backend.place.controller;

import com.mohaeng.backend.common.BaseResponse;
import com.mohaeng.backend.member.jwt.TokenGenerator;
import com.mohaeng.backend.place.dto.response.FindAllReviewResponse;
import com.mohaeng.backend.place.service.ReviewService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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



}
