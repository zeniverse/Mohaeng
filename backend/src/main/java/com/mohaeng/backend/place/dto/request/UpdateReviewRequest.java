package com.mohaeng.backend.place.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateReviewRequest {
    private String title;
    private String content;
    private String rating;
}
