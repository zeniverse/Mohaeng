package com.mohaeng.backend.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class VisibilityRequest {
    private Boolean isPublished;
}
