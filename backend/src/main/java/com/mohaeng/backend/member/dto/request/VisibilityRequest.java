package com.mohaeng.backend.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class VisibilityRequest {
    private Boolean isPublished;
}
