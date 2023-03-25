package com.mohaeng.backend.member.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {
    NORMAL("ROLE_NORMAL", "NORMAL"), ADMIN("ROLE_ADMIN", "ADMIN"), BAN("ROLE_BAN", "BAN");
    private final String key;
    private final String title;
}
