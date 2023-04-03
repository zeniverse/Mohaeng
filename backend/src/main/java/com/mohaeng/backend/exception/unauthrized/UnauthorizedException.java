package com.mohaeng.backend.exception.unauthrized;

import com.mohaeng.backend.exception.ErrorCode;
import lombok.Getter;

@Getter
public class UnauthorizedException extends RuntimeException {

    private ErrorCode errorCode;

    public UnauthorizedException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
}
