package com.mohaeng.backend.exception.notfound;

import static com.mohaeng.backend.exception.ErrorCode.PLACE_NOT_FOUND;

public class PlaceNotFoundException extends NotFoundException {
    public PlaceNotFoundException() {
        super(PLACE_NOT_FOUND, "장소를 찾을 수 없습니다.");
    }
}
