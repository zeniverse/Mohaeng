package com.mohaeng.backend.member.jwt;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Token {
    private String accessToken;
    private String refreshToken;
}
