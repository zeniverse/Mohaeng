package com.mohaeng.backend.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class BaseResponse<T> {
    private String result;
    private T data;

    public BaseResponse(String result) {
        this.result = result;
    }

    public static <T> BaseResponse<T> success(T data){
        return new BaseResponse("OK",data);
    }

    public static <T> BaseResponse<T> success(){
        return new BaseResponse("OK");
    }

//    public static BaseResponse<Void> error() {
//        return new BaseResponse<Void>("error", null);
//    }

}
