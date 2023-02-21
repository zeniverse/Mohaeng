package com.mohaeng.backend.service;

import com.mohaeng.backend.place.entity.Member;
import com.mohaeng.backend.place.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class MemberServiceTest {

    @Autowired
    private MemberRepository memberRepository;

    @InjectMocks
    private MockMvc mockMvc;

    @BeforeEach
    void clean() {
        memberRepository.deleteAll();
    }

    @Test
    @DisplayName("로그인 성공")
    void 로그인_성공() throws Exception {
        //given
        memberRepository.save(Member.builder()
                        .name("hong")
                        .email("binaryhong@gmail.com")
                        .password("1234")
                        .build());
        //when

        //then

    }
}
