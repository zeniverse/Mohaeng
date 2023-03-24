package com.mohaeng.backend.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class KakaoUserDto {
    private String email;
    private String name;
    private String profileImage;
}
