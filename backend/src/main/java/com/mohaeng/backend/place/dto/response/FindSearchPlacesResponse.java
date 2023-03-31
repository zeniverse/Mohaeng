package com.mohaeng.backend.place.dto.response;

import com.mohaeng.backend.place.dto.PlaceSearchDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class FindSearchPlacesResponse {
    private List<PlaceSearchDto> content;
    private int totalPages;
    private long totalElements;
}
