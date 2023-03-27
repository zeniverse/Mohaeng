package com.mohaeng.backend.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberLoginDto {
    private Long id;
    private String nickName;
    private String email;
    private byte[] imageByteArray;
}
