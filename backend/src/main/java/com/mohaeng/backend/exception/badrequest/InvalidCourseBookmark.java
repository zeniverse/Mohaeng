package com.mohaeng.backend.exception.badrequest;

import static com.mohaeng.backend.exception.ErrorCode.ALREADY_BOOKMARK_COURSE;
import static com.mohaeng.backend.exception.ErrorCode.ALREADY_LIKED_COURSE;

public class InvalidCourseBookmark extends BadRequestException {
    public InvalidCourseBookmark() {
        super(ALREADY_BOOKMARK_COURSE, "이미 북마크에 추가된 코스입니다.");
    }
}
