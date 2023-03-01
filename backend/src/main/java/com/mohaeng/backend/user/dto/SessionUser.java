package com.mohaeng.backend.user.dto;

import com.mohaeng.backend.user.domain.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private Long id ;
    private String email ;
    private String nickName ;

    public SessionUser(User user) {
        this.id = user.getId() ;
        this.email = user.getEmail() ;
        this.nickName = user.getNickName() ;
    }
}
