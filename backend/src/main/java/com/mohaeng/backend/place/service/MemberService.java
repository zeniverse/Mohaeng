package com.mohaeng.backend.place.service;

import com.mohaeng.backend.place.dto.MemberDto;
import com.mohaeng.backend.place.entity.Member;
import com.mohaeng.backend.place.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberDto getUserInfo(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("User not found with id: " + id));
        return MemberDto.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .build();
    }

    // Other service methods

}
