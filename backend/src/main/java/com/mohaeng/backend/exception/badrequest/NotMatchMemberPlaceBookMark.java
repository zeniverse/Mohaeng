package com.mohaeng.backend.exception.badrequest;

import static com.mohaeng.backend.exception.ErrorCode.NOT_MATCH_MEMBER_AND_PLACE_BOOKMARK;

public class NotMatchMemberPlaceBookMark extends BadRequestException {
    public NotMatchMemberPlaceBookMark() {
        super(NOT_MATCH_MEMBER_AND_PLACE_BOOKMARK, "사용자가 북마크 하지 않은 장소입니다.");
    }
}
