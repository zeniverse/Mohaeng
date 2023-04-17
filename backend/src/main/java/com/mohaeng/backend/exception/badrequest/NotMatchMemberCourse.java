package com.mohaeng.backend.exception.badrequest;

import static com.mohaeng.backend.exception.ErrorCode.NOT_MATCH_MEMBER_AND_COURSE;

public class NotMatchMemberCourse extends BadRequestException {
    public NotMatchMemberCourse() {
        super(NOT_MATCH_MEMBER_AND_COURSE, "사용자가 작성하지 않은 코스 입니다");
    }
}
