package com.mohaeng.backend.exception.badrequest;

import static com.mohaeng.backend.exception.ErrorCode.INVALID_KEYWORD_PLACE_IN_COURSE;

public class InvalidKeywordPlaceInCourse extends BadRequestException {
    public InvalidKeywordPlaceInCourse() {
        super(INVALID_KEYWORD_PLACE_IN_COURSE, "코스에 추가할 여행지를 입력하세요.");
    }
}
