package com.mohaeng.backend.exception.notfound;

import static com.mohaeng.backend.exception.ErrorCode.COURSE_NOT_FOUND;

public class CourseNotFoundException extends NotFoundException {
    public CourseNotFoundException() {
        super(COURSE_NOT_FOUND, "코스를 찾을 수 없습니다.");
    }
}
