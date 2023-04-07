package com.mohaeng.backend.exception.notfound;

import com.mohaeng.backend.exception.ErrorCode;

import static com.mohaeng.backend.exception.ErrorCode.REVIEW_NOT_FOUND;

public class ReviewNotFoundException extends NotFoundException{
    public ReviewNotFoundException(){
        super(REVIEW_NOT_FOUND, "리뷰를 찾을 수 없습니다.");
    }
}
