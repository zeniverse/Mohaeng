package com.mohaeng.backend.member.dto;

import com.mohaeng.backend.member.domain.Member;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionMember implements Serializable {
    private Long id ;
    private String email ;
    private String nickName ;

    public SessionMember(Member member) {
        this.id = member.getId() ;
        this.email = member.getEmail() ;
        this.nickName = member.getNickName() ;
    }
}
