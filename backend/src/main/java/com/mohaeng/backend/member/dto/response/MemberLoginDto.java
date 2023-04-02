package com.mohaeng.backend.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class MemberLoginDto {
    private Long id;
    private String nickName;
    private String email;
//    private byte[] imageByteArray;
    private String imgUrl;
}
