package com.mohaeng.backend.place.dto.response;

import com.mohaeng.backend.place.domain.PlaceBookmark;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class PlaceBookmarkResponse {

    private Long placeId;
    private Long memberId;

    public static PlaceBookmarkResponse from(Long placeId, Long memberId) {
        return new PlaceBookmarkResponse(placeId, memberId);
    }

}
