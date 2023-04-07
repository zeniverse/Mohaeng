package com.mohaeng.backend.exception.notfound;

import static com.mohaeng.backend.exception.ErrorCode.NOT_EXIST_COURSE_BOOKMARK;
import static com.mohaeng.backend.exception.ErrorCode.NOT_EXIST_COURSE_LIKES;

public class CourseBookmarkNotFoundException extends NotFoundException {
    public CourseBookmarkNotFoundException() {
        super(NOT_EXIST_COURSE_BOOKMARK, "현재 유저는 해당 코스를 북마크에 담지 않았습니다.");
    }
}
