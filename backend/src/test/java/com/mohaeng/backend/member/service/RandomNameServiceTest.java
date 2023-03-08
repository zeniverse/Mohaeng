package com.mohaeng.backend.member.service;

import com.mohaeng.backend.member.domain.Member;
import com.mohaeng.backend.member.domain.Role;
import com.mohaeng.backend.member.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class RandomNameServiceTest {
    @Autowired
    private RandomNameService randomNameService;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void 닉네임_생성_검사() {
        String nickName = randomNameService.generateNickName();
        Member member1 = memberRepository.save(new Member("Kim", "kim@gmail.com", Role.NORMAL, nickName));
        Assertions.assertThat(member1.getNickName()).isEqualTo(nickName);
    }

    @Test
    public void 중복_닉네임_체크_검사() {
        String[] animalNames = randomNameService.getAnimalNames();
        String[] adjectiveNames = randomNameService.getAdjectiveNames();
        String nickName = adjectiveNames[0] + animalNames[0];

        memberRepository.save(new Member("Kim", "kim@gmail.com", Role.NORMAL, nickName));

        String generatedNickName = randomNameService.checkDuplicateNickName(List.of(nickName), 0, 0);

        Assertions.assertThat(nickName).isNotEqualTo(generatedNickName);
    }

    @Test
    public void 닉네임_변경_검사() {
        Member member = memberRepository.save(new Member("Kim", "kim@gmail.com", Role.NORMAL, "testNick"));
        String nickName = randomNameService.generateNickName();
        member.changeNickName(nickName);

        Assertions.assertThat(nickName).isEqualTo(member.getNickName());
    }
}