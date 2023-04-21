package com.mohaeng.backend.place.dto.response;

import com.mohaeng.backend.place.dto.PlaceDetailsDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class PlaceDetailsResponse {

    private List<PlaceDetailsDto> content;
}
