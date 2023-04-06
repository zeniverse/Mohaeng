package com.mohaeng.backend.exception.notfound;

import static com.mohaeng.backend.exception.ErrorCode.NOT_EXIST_PLACE_BOOKMARK;

public class PlaceBookmarkNotFoundException extends NotFoundException {
    public PlaceBookmarkNotFoundException() {
        super(NOT_EXIST_PLACE_BOOKMARK, "현재 유저는 해당 여행지를 북마크에 담지 않았습니다.");
    }
}
