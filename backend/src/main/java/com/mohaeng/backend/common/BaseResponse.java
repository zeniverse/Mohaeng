package com.mohaeng.backend.common;

import lombok.Getter;

@Getter
public class BaseResponse<T> {
    private String result;
    private T data;

    public BaseResponse(String result, T data) {
        this.result = result;
        this.data = data;
    }

    public BaseResponse(String result) {
        this.result = result;
    }

    public static <T> BaseResponse<T> success(String result, T data){
        return new BaseResponse(result, data);
    }

    public static <T> BaseResponse<T> success(String result){
        return new BaseResponse(result);
    }

}
