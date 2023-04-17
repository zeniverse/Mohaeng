package com.mohaeng.backend.exception.badrequest;

import static com.mohaeng.backend.exception.ErrorCode.NOT_MATCH_MEMBER_AND_REVIEW;

public class NotMatchMemberReview extends BadRequestException {
    public NotMatchMemberReview() {
        super(NOT_MATCH_MEMBER_AND_REVIEW, "사용자가 작성하지 않은 리뷰 입니다");
    }
}
