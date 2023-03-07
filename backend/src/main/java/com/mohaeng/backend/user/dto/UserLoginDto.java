package com.mohaeng.backend.user.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserLoginDto {
    private Long id;

    private String nickName;

    private String email;
}
