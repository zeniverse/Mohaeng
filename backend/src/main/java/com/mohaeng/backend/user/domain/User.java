package com.mohaeng.backend.user.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String nickName;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String imageName;
    private String originName;
    private String imageURL;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean isActive;
    private int stopCount;

    public User(String name, String email, Role role, String nickName) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.nickName = nickName;
    }

    // OAuth 서버에서 사용자의 정보가 변경될 수 있기때문
    public User update(String name) {
        this.name = name;
        return this;
    }

    public void changeNickName(String nickName) {
        this.nickName = nickName;
    }
}
