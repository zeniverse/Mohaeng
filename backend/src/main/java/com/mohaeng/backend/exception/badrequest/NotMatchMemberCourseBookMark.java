package com.mohaeng.backend.exception.badrequest;

import static com.mohaeng.backend.exception.ErrorCode.INVALID_KEYWORD_PLACE_IN_COURSE;
import static com.mohaeng.backend.exception.ErrorCode.NOT_MATCH_MEMBER_AND_COURSE_BOOKMARK;

public class NotMatchMemberCourseBookMark extends BadRequestException {
    public NotMatchMemberCourseBookMark() {
        super(NOT_MATCH_MEMBER_AND_COURSE_BOOKMARK, "사용자가 북마크 하지 않은 코스입니다.");
    }
}
