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

    private String imageName;
    private String originName;
    private String imageURL;

    @Column(nullable = false)
    private Role role;
    private boolean isActive;
    private int stopCount;
}
