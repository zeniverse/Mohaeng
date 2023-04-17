package com.mohaeng.backend.place.dto.response;

import com.mohaeng.backend.place.dto.FindAllPlacesDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class FindAllPlacesResponse {
    private List<FindAllPlacesDto> content;
    private int totalPages;
    private long totalElements;
}
