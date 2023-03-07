package com.mohaeng.backend.user.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {
    NORMAL("일반", "NORMAL"), ADMIN("관리자", "ADMIN"), BAN("금지", "BAN");
    private final String key;
    private final String title;
}
