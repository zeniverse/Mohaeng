package com.mohaeng.backend.place.dto.request;

import lombok.Data;

@Data
public class CreateReviewRequest {
    private String title;
    private String content;
    private double rating;
}
