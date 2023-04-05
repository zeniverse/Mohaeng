package com.mohaeng.backend.exception.unauthrized;

import static com.mohaeng.backend.exception.ErrorCode.PERMISSION_DENIED;

public class MemberPermissionDenied extends UnauthorizedException {
    public MemberPermissionDenied() {
        super(PERMISSION_DENIED, "요청자와 작성자가 일치하지 않습니다.");
    }
}
