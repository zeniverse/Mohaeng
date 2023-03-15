package com.mohaeng.backend.place.entity;

import com.mohaeng.backend.place.dto.MemberDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "member")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "membername")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;


    public MemberDto toDto() {
        return MemberDto.builder()
                .id(id)
                .name(name)
                .email(email)
                .build();
    }
}
