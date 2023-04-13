package com.mohaeng.backend.place.dto.response;

import com.mohaeng.backend.place.domain.Review;
import com.mohaeng.backend.place.dto.MainPageDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
public class MainPageResponse {
    private List<MainPageDto> content;
    private int totalPages;
    private long totalElements;

    public static MainPageResponse from(List<MainPageDto> content) {
        return MainPageResponse.builder()
                .content(content)
                .build();
    }
}
