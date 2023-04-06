package com.mohaeng.backend.exception.badrequest;

import static com.mohaeng.backend.exception.ErrorCode.ALREADY_LIKED_COURSE;
import static com.mohaeng.backend.exception.ErrorCode.INVALID_KEYWORD_PLACE_IN_COURSE;

public class InvalidCourseLikes extends BadRequestException {
    public InvalidCourseLikes() {
        super(ALREADY_LIKED_COURSE, "이미 좋아요 처리를 완료한 코스입니다.");
    }
}
