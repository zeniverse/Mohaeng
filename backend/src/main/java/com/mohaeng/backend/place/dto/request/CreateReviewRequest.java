package com.mohaeng.backend.place.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateReviewRequest {
    private String title;
    private String content;
    private String rating;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdDate;
}
