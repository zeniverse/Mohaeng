package com.mohaeng.backend.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

@Getter
@NoArgsConstructor(access = PRIVATE)
@AllArgsConstructor(access = PRIVATE)
public class ExceptionResponse {

    private ErrorCode errorCode;
    private String message;

    public static ExceptionResponse from(ErrorCode errorCode, String message){
        return new ExceptionResponse(errorCode, message);
    }
}
