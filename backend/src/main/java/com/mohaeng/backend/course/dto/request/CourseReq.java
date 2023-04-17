package com.mohaeng.backend.course.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CourseReq {
    @NotBlank
    private String title;
    @NotNull
    private String startDate;
    @NotNull
    private String endDate;
    @NotNull
    private Boolean isPublished;
    private String courseDays;
    @NotBlank
    private String region;

    private String thumbnailUrl;
    private String content;
    @NotEmpty
    private List<Long> placeIds = new ArrayList<>();

    @Builder
    public CourseReq(String title, String startDate, String endDate,
                     Boolean isPublished, String courseDays, String region, String thumbnailUrl, String content, List<Long> placeIds) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isPublished = isPublished;
        this.courseDays = courseDays;
        this.region = region;
        this.thumbnailUrl = thumbnailUrl;
        this.content = content;
        this.placeIds = placeIds;
    }
}
