package com.mohaeng.backend.exception.notfound;

import static com.mohaeng.backend.exception.ErrorCode.COURSE_NOT_FOUND;
import static com.mohaeng.backend.exception.ErrorCode.NOT_EXIST_COURSE_LIKES;

public class CourseLikesNotFoundException extends NotFoundException {
    public CourseLikesNotFoundException() {
        super(NOT_EXIST_COURSE_LIKES, "현재 유저가 해당 코스의 좋아요를 누르지 않았습니다.");
    }
}
